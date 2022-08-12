import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeesService } from '../services/fees.service';
import { FeesDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-fee-types',
  templateUrl: './fee-types.component.html',
  styleUrls: ['./fee-types.component.css']
})
export class FeeTypesComponent implements OnInit {

  constructor(private feeService : FeesService, private router : Router) { }

  feeTypes : FeesDetailsBO[] = [];
  ngOnInit() {
    this.feeService.getFeeTypes().subscribe(
      response => {
        this.feeTypes = response;
      },
      error => {
        alert("Error in fetching fee types");
        console.log(error);
      }
    );
  }

  editFeeType(feeType: FeesDetailsBO){
    // console.log('Editing student : '+ student.firstName);
    let feeId;
    if(feeType===undefined)
    feeId=-1;
    else
      feeId = feeType.feeId;
    this.router.navigate(['/fee-types/new-type',feeId]);
  }

  configureDetails(feeType : FeesDetailsBO){
    this.router.navigate(['/fee-details',feeType.feeId+"-"+feeType.feeName]);
  }
}
