import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}