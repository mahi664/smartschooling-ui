import { Component, OnInit } from '@angular/core';

export class RoleDetails {
  constructor(public roleId: string, public roleName: string, public roleDescription: string) {}
}

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css']
})
export class NewRoleComponent implements OnInit {

  roleDetails : RoleDetails = new RoleDetails("","","");
  validationFlags = {};

  constructor() { }

  ngOnInit() {
    this.initValidationFlags();
  }

  initValidationFlags(){
    this.validationFlags['roleName'] = false;
  }

  validateField(field : string, value : string){
    this.validationFlags[field]= value==="" ? true : false;
  }

  saveRoleType(){
    console.log("Adding new Role Details", this.roleDetails);
    if(this.validateRoleDetails()){

    }else{
      alert("Please Fill all the required Details!");
    }
  }

  validateRoleDetails(){
    let retFlag = true;
    if(this.roleDetails.roleName==="" || this.roleDetails.roleName===undefined){
      this.validationFlags['roleName'] = true;
      retFlag = false;
    }
    return retFlag;
  }
}