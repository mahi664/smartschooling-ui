import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAdvanceDetails } from '../user-details/user-details.component';
import { UserBasicDetails } from '../user-list/user-list.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private commonService: CommonService, private http : HttpClient) { }

  getUsers(){
    return this.http.get<UserBasicDetails[]>(`${this.commonService.BASE_URL}/users`);
  }

  addNewUser(user : UserBasicDetails){
    return this.http.post<UserBasicDetails>(`${this.commonService.BASE_URL}/users`, user);
  }

  getUserAdvanceDetails(userId : string){
    return this.http.get<UserAdvanceDetails>(`${this.commonService.BASE_URL}/users/${userId}`);
  }
}
