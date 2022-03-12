import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaveDetails } from '../new-leave-type/new-leave-type.component';
import { LeaveTpesService } from '../services/leave-tpes.service';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-role-configuration',
  templateUrl: './role-configuration.component.html',
  styleUrls: ['./role-configuration.component.css']
})
export class RoleConfigurationComponent implements OnInit {

  roleId : string = "-1";
  leaveTypes : LeaveDetails[] = [];
  roleApplicableLeaveTypes : LeaveDetails[] = [];
  updateFlag: boolean = false;

  constructor(private route: ActivatedRoute, private roleService: RolesService, 
    private leaveTypeService: LeaveTpesService) { }

  ngOnInit() {
    this.roleId = this.route.snapshot.params['roleId'];
    
    this.leaveTypeService.getLeaveTypes().subscribe(
      response => {
        this.leaveTypes = response;
        console.log(this.leaveTypes);
      },
      error => {
        console.log("Error in fetching leave types");
        console.log(error);
      }
    );
    
    this.roleService.getRoleApplicableLeaves(this.roleId).subscribe(
      response => {
        this.roleApplicableLeaveTypes = response;
        console.log(this.roleApplicableLeaveTypes);
      },
      error => {
        console.log("Error while fetching role applicable leave types", error);
      }
    );
  }

  isLeaveTypeSelected(leaveType: LeaveDetails){
    let leaveDetails : LeaveDetails = null;
    leaveDetails = this.roleApplicableLeaveTypes.filter(leaveDets => leaveDets.leaveId===leaveType.leaveId)[0];
    if(leaveDetails===undefined){
      return false;
    }
    return true;
  }

  addRemoveLeaveTypeFromRole(leaveType: LeaveDetails, leaveTypeAlreadySelected: boolean){
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
      this.roleService.addRoleApplicableLeaveTypes(this.roleId, this.roleApplicableLeaveTypes).subscribe(
        response => {
          alert("Role Applicable Leaves Saved Successfully");
          console.log(response);
        },
        error => {
          alert("Error while saving role applicable leaves. Please try after some time");
          console.log(error);
        }
      );
      this.updateFlag = false;
    }
  }
}
