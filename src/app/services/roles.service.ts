import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveDetails } from '../new-leave-type/new-leave-type.component';
import { RoleDetails } from '../new-role/new-role.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http : HttpClient, private commonService: CommonService) { }

  public getRoleDetails(){
    return this.http.get<RoleDetails[]>(`${this.commonService.BASE_URL}/roles`);
  }

  public addNewRole(roleDetails : RoleDetails){
    return this.http.post<RoleDetails>(`${this.commonService.BASE_URL}/roles`, roleDetails);
  }

  public getRoleApplicableLeaves(roleId: string){
    return this.http.get<LeaveDetails[]>(`${this.commonService.BASE_URL}/roles/${roleId}/leave-types`);
  }

  public addRoleApplicableLeaveTypes(roleId: string, leaveTypes: LeaveDetails[]){
    return this.http.post<LeaveDetails[]>(`${this.commonService.BASE_URL}/roles/${roleId}/leave-types`, leaveTypes);
  }
}
