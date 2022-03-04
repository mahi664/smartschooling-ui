import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService : AuthenticationService, private router : Router){}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    if(this.authService.isUserLogedIn() && !this.authService.tokenExpired(this.authService.getToken())){
      return true;
    }else{
      this.authService.clearToken();
    }
    window.location.href="";
  }
}
