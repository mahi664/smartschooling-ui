import { Component, OnInit } from '@angular/core';
import { UserAdvanceService } from '../services/user-advance.service';

export class SalaryDetails {
  constructor(public amount: number, public effDate: Date, public endDate: Date) {   
  }
}

@Component({
  selector: 'app-user-salary-details',
  templateUrl: './user-salary-details.component.html',
  styleUrls: ['./user-salary-details.component.css']
})
export class UserSalaryDetailsComponent implements OnInit {

  userSalaryDetails : SalaryDetails[];
  constructor(private userAdvanceService : UserAdvanceService) { }

  ngOnInit() {
    this.userSalaryDetails = this.userAdvanceService.getUserAdvanceDetails().userSalaryDetails;
  }

}
