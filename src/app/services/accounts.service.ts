import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetailsBO } from '../fees-receivable-details/fees-receivable-details.component';
import { AcademicDetailsBO } from '../student-list/student-list.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private commonService: CommonService, private http: HttpClient) { }

  getAccountDetails(){
    return this.http.get<AccountDetailsBO[]>(this.commonService.BASE_URL+"/Accounts/Details");
  }

  addNewAccountDetails(accountDetailsBO : AcademicDetailsBO){
    return this.http.post<AcademicDetailsBO>(this.commonService.BASE_URL+"/Accounts/Details", accountDetailsBO);
  }
}
