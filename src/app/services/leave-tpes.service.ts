import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveDetails } from '../new-leave-type/new-leave-type.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveTpesService {

  constructor(private http : HttpClient, private commonService: CommonService) { }

  public getLeaveTypes(){
    return this.http.get<LeaveDetails[]>(`${this.commonService.BASE_URL}/Leave-Types`);
  }

  public addNewLeaveType(leaveDetails : LeaveDetails){
    return this.http.post<LeaveDetails>(`${this.commonService.BASE_URL}/Leave-Types`, leaveDetails);
  }

  public getLeaveAccrualFrequency(){
    return this.http.get<string[]>(`${this.commonService.BASE_URL}/Leave-Types/accrual-frequency`);
  }
}
