import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { UserBasicDetails } from '../user-list/user-list.component';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  user : UserBasicDetails = new UserBasicDetails(null,"","","","","","",null,"","","","","","","");
  validationFlags = {};

  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit() {

    this.initValidationFlags();
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

  validateField(field : string, value : string){
    this.validationFlags[field]= value==="" ? true : false;
    if(field==="mobileNumber"){
      this.validationFlags["mobileNumberValidity"] = (value.length==10 && (value.match("[a-zA-Z]")==undefined || value.match("[a-zA-Z]").length==0)) ? false : true;
    }
  }

  saveDetails(user: UserBasicDetails) {
    console.log("Adding new User:");
    console.log(user);
    if (this.validateStudentDetails(user)) {
      this.userService.addNewUser(user).subscribe(
        response => {
          console.log("User added successfully", response);
          alert("User Added Successfully!");
          this.router.navigate(['users']);
        },
        error => {
          console.log("Error in adding new user!");
        }
      );
    }else{
      alert("Please fill all the required details");
    }
  }

  validateStudentDetails(user: UserBasicDetails) {
    let retFlag = true;
    if(user.firstName==="" || user.firstName===undefined){
      this.validationFlags["firstName"] = true;
      retFlag = false;
    }
    if(user.lastName==="" || user.lastName===undefined){
      this.validationFlags["lastName"] = true;
      retFlag = false;
    }
    if(user.gender==="" || user.gender===undefined){
      this.validationFlags["gender"] = true;
      retFlag = false;
    }
    if(user.religion==="" || user.religion===undefined){
      this.validationFlags["religion"] = true;
      retFlag = false;
    }
    if(user.caste==="" || user.caste===undefined){
      this.validationFlags["caste"] = true;
      retFlag = false;
    }
    if(user.nationality==="" || user.nationality===undefined){
      this.validationFlags["nationality"] = true;
      retFlag = false;
    }
    if(user.mobile==="" || user.mobile===undefined){
      this.validationFlags["mobileNumber"] = true;
      retFlag = false;
    }else{
      if(user.mobile.length!=10 || (user.mobile.match("[a-zA-Z]")!=undefined && user.mobile.match("[a-zA-Z]").length!=0)){
        this.validationFlags['mobileNumberValidity'] = true;
        retFlag = false;
      }
    }
    if(user.address==="" || user.address===undefined){
      this.validationFlags["address"] = true;
      retFlag = false;
    }
    return retFlag;
  }

}
