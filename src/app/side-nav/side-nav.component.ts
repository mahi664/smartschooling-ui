import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(public commonService : CommonService) { }

  ngOnInit() {
  }
  sideNavExpanded = this.commonService.sideNavExpanded;
  rightDropDownForInventory = false;
  rightDropDownForVendor=false;
  rightDropDownForCustomers=false;
  rightDropDownForInvoices=false;
  rightDropDownForBilling=false;
}
