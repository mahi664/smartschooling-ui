import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeesDetailsBO } from '../student-list/student-list.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getFeeTypes() {
    return this.http.get<FeesDetailsBO[]>(this.commonService.BASE_URL+"/Fees/Types");
  }

  addNewFeeType(feeTypeList : FeesDetailsBO[]){
    return this.http.post<FeesDetailsBO[]>(this.commonService.BASE_URL+"/Fees/Types", feeTypeList);
  }

  addNewFeeDetails(feeDetailsList : FeesDetailsBO[]){
    return this.http.post<FeesDetailsBO[]>(this.commonService.BASE_URL+"/Fees/Details", feeDetailsList);
  }

  getFeeDetails(feeId : String){
    return this.http.get<FeesDetailsBO[]>(`${this.commonService.BASE_URL}/Fees/Details/${feeId}`);
  }
}

