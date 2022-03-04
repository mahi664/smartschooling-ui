import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, loginResponse } from '../login/login.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  isUserLogedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token === null || token === "") {
      return false;
    }
    return true;
  }

  loginUser(loginRequest: LoginRequest) {
    return this.http.post<loginResponse>(this.commonService.BASE_URL + "/auth", loginRequest);
  }

  setToken(loginResponse: loginResponse) {
    localStorage.setItem("token", loginResponse.token);
    localStorage.setItem("username", loginResponse.username);
    localStorage.setItem("role", loginResponse.role);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  logOutUser(){
    this.clearToken();
    window.location.href="";
  }
}
