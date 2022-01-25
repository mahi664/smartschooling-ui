import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from '../services/classes.service';
import { FeesService } from '../services/fees.service';
import { TransportationService } from '../services/transportation.service';
import { ClassesDetailsBO, FeesDetailsBO, RouteDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-fee-details',
  templateUrl: './fee-details.component.html',
  styleUrls: ['./fee-details.component.css']
})
export class FeeDetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private classesService: ClassesService, 
    private transportationService: TransportationService, private feeService : FeesService) { }

  feeId: string;
  feeDetails: FeesDetailsBO[] = [];
  newFeeDetails = {};
  applicableValues = [];
  classes: ClassesDetailsBO[] = [];
  routes: RouteDetailsBO[] = [];
  dataValidationFlags = {};
  ngOnInit() {
    this.feeId = this.router.snapshot.params["feeType"];
    this.initDataValidationFlags();

    this.feeService.getFeeDetails(this.feeId).subscribe(
      response => {
        this.feeDetails = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );

    this.classesService.getClassesNames().subscribe(
      response => {
        this.classes = response;
      },
      error => {
        console.log("Error while fetching classes list");
        console.log(error);
      }
    );

    this.transportationService.getRoutes().subscribe(
      response => {
        this.routes = response;
      },
      error => {
        console.log("Error while fetching routes list");
        console.log(error);
      }
    );
  }

  initDataValidationFlags(){
    this.dataValidationFlags["applicableTo"] = false;
    this.dataValidationFlags["applicableValue"] = false;
    this.dataValidationFlags["amount"] = false;
  }

  populateApplicableValueList() {
    this.applicableValues = [];
    if (this.newFeeDetails['applicableTo'] === "Classes") {
      console.log("populating classes list as a applicabilty values");
      for (let classObj of this.classes) {
        this.applicableValues.push(classObj.classId);
      }
    } else if (this.newFeeDetails['applicableTo'] === "Routes") {
      console.log("populating Routes list as a applicabilty values");
      for (let route of this.routes) {
        this.applicableValues.push(route.routeId);
      }
    } else if(this.newFeeDetails['applicableTo'] === "All"){
      this.newFeeDetails["applicableValue"] = "All";
    }

    this.handleDataValidationFlag("applicableTo",this.newFeeDetails['applicableTo']);
  }
  
  handleDataValidationFlag(field: string, value: any) {
    if(value!=undefined && value!=""){
      this.dataValidationFlags[field] = false;
    }
  }

  addNewFeeDetailsRecord() {
    if (this.isNewFeeDetailsValid()) {
      let feeDetailsBo: FeesDetailsBO = new FeesDetailsBO(this.feeId, "", "", " ", " ", 0, new Date(), new Date());
      if (this.newFeeDetails["applicableTo"] === "Classes") {
        feeDetailsBo.classId = this.newFeeDetails["applicableValue"];
      } else if (this.newFeeDetails["applicableTo"] === "Routes") {
        feeDetailsBo.routeId = this.newFeeDetails["applicableValue"];
      }
      feeDetailsBo.amount = this.newFeeDetails["amount"];
      let feeDetailsList : FeesDetailsBO[] = [];
      feeDetailsList.push(feeDetailsBo);
      this.feeService.addNewFeeDetails(feeDetailsList).subscribe(
        response => {
          alert("Fees Details Added successfully");
          feeDetailsBo = response[0];
          this.feeDetails.push(feeDetailsBo);
          console.log(response);
        },
        error => {
          alert("Error in adding new fee details. Please contact system administrator");
          console.log(error);
        }
      );
      this.newFeeDetails = {};
    }else{
      alert("Please Fill required Details");
    }
  }

  isNewFeeDetailsValid(){
    if(this.newFeeDetails["applicableTo"]===undefined || this.newFeeDetails["applicableTo"]===""){
      this.dataValidationFlags["applicableTo"] = true;
      return false;
    }else if(this.newFeeDetails["applicableTo"]!="All"){
      if(this.newFeeDetails["applicableValue"]===undefined || this.newFeeDetails["applicableValue"]===""){
        this.dataValidationFlags["applicableValue"] = true;
        return false;
      }
    }

    if(this.newFeeDetails["amount"]===undefined || this.newFeeDetails["amount"] === ""){
      this.dataValidationFlags["amount"] = true;
      return false;
    }
    return true;
  }
}
