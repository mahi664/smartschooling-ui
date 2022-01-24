import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeesDetailsBO } from '../student-list/student-list.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getFeeDetails() {
    return this.http.get<FeesDetailsBO[]>(this.commonService.BASE_URL+"/Fees/Types");
  }

  addNewFeeType(feeTypeList : FeesDetailsBO[]){
    return this.http.post<FeesDetailsBO[]>(this.commonService.BASE_URL+"/Fees/Types", feeTypeList);
  }
}

