import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeesService } from '../services/fees.service';
import { FeesDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-new-fee-type',
  templateUrl: './new-fee-type.component.html',
  styleUrls: ['./new-fee-type.component.css']
})
export class NewFeeTypeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private feeService: FeesService) { }

  feeId: String;
  feeType: FeesDetailsBO = null;
  isFeeTypeEmpty: boolean = false;
  ngOnInit() {

    this.feeId = this.route.snapshot.params['feeType'];

    if (this.feeId === "" || this.feeId === "-1") {
      this.feeType = new FeesDetailsBO("", "", "", "", "", 0);
      console.log("Adding new student : " + this.feeType.feeDiscription);
    } else {
      // TODO : Add Code to fetch specific fee type from FeeId and then populate fee type object.
    }
  }

  saveFeeType(feeType: FeesDetailsBO) {
    if (this.valdateFeeTypeDate(feeType)) {
      console.log("Saving Fee type:" + feeType);
      let feeTypeList: FeesDetailsBO[] = [];
      feeTypeList.push(feeType);
      this.feeService.addNewFeeType(feeTypeList).subscribe(
        response => {
          console.log(response);
          alert("New Fee Type Added SuccessFully");
        },
        error => {
          console.log(error);
          alert("Error in adding new Fee Type. Please contact system administrator");
        }
      );
    }else{
      alert("Please fill required details");
    }
  }

  valdateFeeTypeDate(feeType : FeesDetailsBO){
    if(feeType.feeName==="" || feeType.feeName === undefined){
      this.isFeeTypeEmpty = true;
      return false;
    }
    return true;
  }

  validateFeeTypeDataOnChange(){
    if(this.feeType.feeName != ""){
      this.isFeeTypeEmpty = false;
    }
  }

}
