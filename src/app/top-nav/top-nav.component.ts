import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
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
}
