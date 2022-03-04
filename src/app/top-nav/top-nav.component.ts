import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  isUserLoggedIn = false;
  constructor(private commonService: CommonService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isUserLogedIn();
  }
  
  toggleSideNav(){
    if(this.commonService.getSideNavExpanded()){
      document.getElementById('sidenavicon').className = 'fas fa-bars';
    }
    else{
      document.getElementById('sidenavicon').className = 'fas fa-arrow-left';
    }
    this.commonService.toggleSideNav();
  }

  doUserSignOut(){
    this.authService.logOutUser();
  }
}
