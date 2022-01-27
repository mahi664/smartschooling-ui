import { Component, OnInit } from '@angular/core';
import { TransportationService } from '../services/transportation.service';
import { RouteDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  routes : RouteDetailsBO[] = [];
  newRouteDetails : RouteDetailsBO = new RouteDetailsBO("","","",null);
  dataValidationFlags={};

  constructor(private transportationService : TransportationService) { }

  ngOnInit() {
    this.initDataValidationFlags();
    this.transportationService.getRoutes().subscribe(
      response => {
        this.routes = response;
        console.log(this.routes);
      },
      error => {
        console.log("Error in fetching routes details");
        console.log(error);
      }
    );
  }

  initDataValidationFlags() {
    this.dataValidationFlags["source"] = false;
    this.dataValidationFlags["destination"] = false;
    this.dataValidationFlags["distance"] = false;
  }

  handleDataValidationFlag(field: string, value: any) {
    if(value!=undefined && value!=""){
      this.dataValidationFlags[field] = false;
    }
  }

  addNewRouteDetails(){
    if(this.isValidateNewRouteDetails()){
      let routesList : RouteDetailsBO[] = [];
      routesList.push(this.newRouteDetails);
      this.transportationService.addNewRoutes(routesList).subscribe(
        response => {
          this.routes.push(response[0]);
          alert("New Route added successfully!");
        },
        error => {
          alert("Error in adding new route. Please contact system administrator");
        }
      );
      this.newRouteDetails = new RouteDetailsBO("","","",null);
    }else{
      alert("Please fill all the required details");
    }
  }

  isValidateNewRouteDetails() {
    let retFlag = true;
    if(this.newRouteDetails.source==="" || this.newRouteDetails.source===undefined){
      this.dataValidationFlags["source"] = true;
      retFlag = false;
    }
    if(this.newRouteDetails.destination==="" || this.newRouteDetails.destination===undefined){
      this.dataValidationFlags["destination"] = true;
      retFlag = false;
    }
    if(this.newRouteDetails.distance==null || this.newRouteDetails.distance===undefined){
      this.dataValidationFlags["distance"] = true;
      retFlag = false;
    }
    return retFlag;
  }

}
