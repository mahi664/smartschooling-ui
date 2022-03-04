import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export class LoginRequest {
  constructor(public username: string, public password: string) {}
}

export class loginResponse {
  constructor(public username: string, public token: string, public role: string) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest : LoginRequest = new LoginRequest("","");
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if(this.authService.isUserLogedIn()){
      window.location.href="/admin-dashboard";
    }
  }

  doUserLogin(){
    if(this.loginRequest.username==="" || this.loginRequest.password===""){
      alert("Username or Password is empty!");
    }else{
      console.log("loging in user :");
      console.log(this.loginRequest);
      this.authService.loginUser(this.loginRequest).subscribe(
        response => {
          this.authService.setToken(response);
          window.location.href="/admin-dashboard";
        },
        error => {
          console.log(error);
          alert("Invalid Login Credentials");
        }
      );
    }
  }
}
