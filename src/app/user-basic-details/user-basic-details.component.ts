import { Component, OnInit } from '@angular/core';
import { UserAdvanceService } from '../services/user-advance.service';
import { UserAdvanceDetails } from '../user-details/user-details.component';
import { UserBasicDetails } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-basic-details',
  templateUrl: './user-basic-details.component.html',
  styleUrls: ['./user-basic-details.component.css']
})
export class UserBasicDetailsComponent implements OnInit {

  userBasicDetails : UserBasicDetails = null;
  validationFlags = {};

  constructor(private userAdvanceSevice : UserAdvanceService) { }

  ngOnInit() {
    this.initValidationFlags();
    let userAdvanceDetails : UserAdvanceDetails = this.userAdvanceSevice.getUserAdvanceDetails();
    this.userBasicDetails = new UserBasicDetails(userAdvanceDetails.userId, userAdvanceDetails.firstName, userAdvanceDetails.middleName, userAdvanceDetails.lastName,
      userAdvanceDetails.mobile, userAdvanceDetails.email, userAdvanceDetails.address, userAdvanceDetails.birthDate, userAdvanceDetails.maritalStatus,
      userAdvanceDetails.adhar, userAdvanceDetails.religion, userAdvanceDetails.caste, userAdvanceDetails.nationality, userAdvanceDetails.gender, userAdvanceDetails.alternateMobile);
      
      console.log(this.userBasicDetails);
  }

  initValidationFlags(){
    this.validationFlags['firstName'] = false;
    this.validationFlags['lastName'] = false;
    this.validationFlags['birthDate'] = false;
    this.validationFlags['gender'] = false;
    this.validationFlags['religion'] = false;
    this.validationFlags['caste'] = false;
    this.validationFlags['nationality'] = false;
    this.validationFlags['mobileNumber'] = false;
    this.validationFlags['address'] = false;
  }

  saveDetails(userBasicDetails : UserBasicDetails){
    //TODO : add post call here for saving user basic details
    alert("Saving user basic details");
  }

  validateField(field : string, value : string){
    // this.validationFlags[field]= value==="" ? true : false;
    // if(field==="mobileNumber"){
    //   this.validationFlags["mobileNumberValidity"] = (value.length==10 && (value.match("[a-zA-Z]")==undefined || value.match("[a-zA-Z]").length==0)) ? false : true;
    // }
  }
}
