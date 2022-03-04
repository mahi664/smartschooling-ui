import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  isUserLogedIn : boolean = false;

  constructor(public commonService : CommonService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.isUserLogedIn = this.authService.isUserLogedIn();
  }
  sideNavExpanded = this.commonService.sideNavExpanded;
  rightDropDownForInventory = false;
  rightDropDownForVendor=false;
  rightDropDownForCustomers=false;
  rightDropDownForInvoices=false;
  rightDropDownForBilling=false;
}
