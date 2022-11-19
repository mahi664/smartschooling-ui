import { Component, OnInit } from '@angular/core';
import { StaffService } from '../services/staff.service';

export class StaffBasicDetails {
  constructor(public firstName: string, public middleName: string, public lastName: string,
    public adharNumber: string, public birthDate: Date, public gender: string, public maritalStatus: string,
    public religion: string, public caste: string, public nationality: string, public mobileNumber: string,
    public alternateMobileNumber: string, public emailId: string, public address: string,
    public userId: string) { }
}

@Component({
  selector: 'app-staff-registration',
  templateUrl: './staff-registration.component.html',
  styleUrls: ['./staff-registration.component.css']
})
export class StaffRegistrationComponent implements OnInit {

  staffBasicDetails : StaffBasicDetails = new StaffBasicDetails("", "", "", "", new Date(), "", "", "", "", "", "", "", "", "", "");
  validationFlags = {};

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.initValidationFlags();
  }

  initValidationFlags(){
    this.validationFlags['firstName'] = false;
    this.validationFlags['lastName'] = false;
    this.validationFlags['birthDate'] = false;
    this.validationFlags['gender'] = false;
    this.validationFlags['maritalStatus'] = false;
    this.validationFlags['religion'] = false;
    this.validationFlags['caste'] = false;
    this.validationFlags['nationality'] = false;
    this.validationFlags['mobileNumber'] = false;
    this.validationFlags['address'] = false;
  }

  validateStaffBasicDetails(staffBasicDetails: StaffBasicDetails) {
    let retFlag = true;
    if(staffBasicDetails.firstName==="" || staffBasicDetails.firstName===undefined){
      this.validationFlags["firstName"] = true;
      retFlag = false;
    }
    if(staffBasicDetails.lastName==="" || staffBasicDetails.lastName===undefined){
      this.validationFlags["lastName"] = true;
      retFlag = false;
    }
    if(staffBasicDetails.gender==="" || staffBasicDetails.gender===undefined){
      this.validationFlags["gender"] = true;
      retFlag = false;
    }
    if(staffBasicDetails.maritalStatus==="" || staffBasicDetails.maritalStatus===undefined){
      this.validationFlags["maritalStatus"] = true;
      retFlag = false;
    }
    if(staffBasicDetails.religion==="" || staffBasicDetails.religion===undefined){
      this.validationFlags["religion"] = true;
      retFlag = false;
    }
    if(staffBasicDetails.caste==="" || staffBasicDetails.caste===undefined){
      this.validationFlags["caste"] = true;
      retFlag = false;
    }
    if(staffBasicDetails.nationality==="" || staffBasicDetails.nationality===undefined){
      this.validationFlags["nationality"] = true;
      retFlag = false;
    }
    if(staffBasicDetails.mobileNumber==="" || staffBasicDetails.mobileNumber===undefined){
      this.validationFlags["mobileNumber"] = true;
      retFlag = false;
    }else{
      if(staffBasicDetails.mobileNumber.length!=10 || (staffBasicDetails.mobileNumber.match("[a-zA-Z]")!=undefined && staffBasicDetails.mobileNumber.match("[a-zA-Z]").length!=0)){
        this.validationFlags['mobileNumberValidity'] = true;
        retFlag = false;
      }
    }
    if(staffBasicDetails.address==="" || staffBasicDetails.address===undefined){
      this.validationFlags["address"] = true;
      retFlag = false;
    }
    
    return retFlag;
  }

  validateField(field : string, value : string){
    console.log(field);
    this.validationFlags[field]= (value==="" || value===null) ? true : false;
    if(field==="mobileNumber"){
      this.validationFlags["mobileNumberValidity"] = (value.length==10 && (value.match("[a-zA-Z]")==undefined || value.match("[a-zA-Z]").length==0)) ? false : true;
    }
  }

  saveDetails(staffBasicDetails: StaffBasicDetails) {
    console.log("Adding new staff basic details:");
    console.log(staffBasicDetails);
    if (this.validateStaffBasicDetails(staffBasicDetails)) {
        this.staffService.addStaffBasicDetails(staffBasicDetails).subscribe(
          response => {
            alert(response.success.data.firstName + " " + response.success.data.lastName + " is added successfully !");
          },
          error => {
            console.log(error);
            alert(error.error.errorCode+":"+error.error.errorMessage);
          }
        );
    }else{
      alert("Please fill all the required details");
    }
  }

}
