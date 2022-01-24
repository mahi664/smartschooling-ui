import { Component, OnInit } from '@angular/core';
import { FeesService } from '../services/fees.service';
import { FeesDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-fee-types',
  templateUrl: './fee-types.component.html',
  styleUrls: ['./fee-types.component.css']
})
export class FeeTypesComponent implements OnInit {

  constructor(private feeService : FeesService) { }

  feeTypes : FeesDetailsBO[] = [];
  ngOnInit() {
    this.feeService.getFeeDetails().subscribe(
      response => {
        this.feeTypes = response;
      },
      error => {
        alert("Error in fetching fee types");
        console.log(error);
      }
    );
  }

}
