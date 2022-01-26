import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  sideNavExpanded = true;
  isLoading = false;
  public BASE_URL = "https://smartschooling.herokuapp.com/";
  //public BASE_URL = "http://localhost:8080";
  // public BASE_URL = "http://demo-env.eba-sdsq2q4z.ap-south-1.elasticbeanstalk.com";
  constructor() { }

  toggleSideNav(){
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  getSideNavExpanded(){
    return this.sideNavExpanded;
  }


}
