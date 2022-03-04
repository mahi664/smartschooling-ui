import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = this.authService.getToken();
    if(token!=null){
    let newReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${token}`
      }
    })
    return next.handle(newReq);
  }else{
    return next.handle(req);
  }
  }
}
