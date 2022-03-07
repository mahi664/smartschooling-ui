import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaveDetails } from '../new-leave-type/new-leave-type.component';

@Component({
  selector: 'app-role-configuration',
  templateUrl: './role-configuration.component.html',
  styleUrls: ['./role-configuration.component.css']
})
export class RoleConfigurationComponent implements OnInit {

  roleId : String = "-1";
  leaveTypes : LeaveDetails[] = [];
  roleApplicableLeaveTypes : LeaveDetails[] = [];
  updateFlag: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.roleId = this.route.snapshot.params['roleId'];
    
    //TODO : Add code to populate leave types

    //TODO : Add code to fetch applicable leave types to roleId
  }

  isLeaveTypeSelected(leaveType: LeaveDetails){
    let leaveDetails : LeaveDetails = null;
    leaveDetails = this.roleApplicableLeaveTypes.filter(leaveDets => leaveDets.leaveId===leaveType.leaveId)[0];
    if(leaveDetails===undefined){
      return false;
    }
    return true;
  }

  addRemoveSubjectFromClass(leaveType: LeaveDetails, leaveTypeAlreadySelected: boolean){
    if(!leaveTypeAlreadySelected){
      console.log("Added new subject to class details");
      console.log(leaveType);
      this.roleApplicableLeaveTypes.push(leaveType);
      console.log(this.roleApplicableLeaveTypes);
    }else{
      console.log("Removed new subject to class details");
      console.log(leaveType);
      this.roleApplicableLeaveTypes = this.roleApplicableLeaveTypes.filter(leaveDetails => leaveDetails.leaveId!=leaveDetails.leaveId);
      console.log(this.roleApplicableLeaveTypes);
    }
    this.updateFlag = true;
  }

  saveDetails(){
    if(this.updateFlag){
      //TODO : Add code to save data in database
      this.updateFlag = false;
    }
  }
}
