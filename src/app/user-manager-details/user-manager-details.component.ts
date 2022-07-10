import { Component, OnInit } from '@angular/core';
import { UserAdvanceService } from '../services/user-advance.service';

export class ManagrDetails {
  constructor(private userId: string, private name: string, private effDate: Date, private endDate: Date) {

  }
}

@Component({
  selector: 'app-user-manager-details',
  templateUrl: './user-manager-details.component.html',
  styleUrls: ['./user-manager-details.component.css']
})
export class UserManagerDetailsComponent implements OnInit {

  userManagerDetails : ManagrDetails[] = [];
  constructor(private userAdvanceService: UserAdvanceService) { }

  ngOnInit() {
    this.userManagerDetails = this.userAdvanceService.getUserAdvanceDetails().userManagerDetails;
    console.log(this.userManagerDetails);
  }
}
