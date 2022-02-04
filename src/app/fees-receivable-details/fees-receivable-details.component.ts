import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';

export class AccountDetailsBO {
  constructor(public accountId: string, public accountName: string, public bankName: string,
    public bankAccountNumber: string) {}
}
export class StudentFeesTransactionDetailsBO {
  constructor(public collectionId: string, public collectionDate: Date, public amount: number,
    public accountsDetailsBO , public academicId2FeesDetailsMap : {}) {}
}

@Component({
  selector: 'app-fees-receivable-details',
  templateUrl: './fees-receivable-details.component.html',
  styleUrls: ['./fees-receivable-details.component.css']
})
export class FeesReceivableDetailsComponent implements OnInit {

  studentId : string ="";
  studentName : string = ""; 
  studentFeesAssignedDetails = {};
  academicId2FeesDueDetails = {};
  studentFeesDuesList = [];
  academicId2FeesAssignedDetails = {};
  studentFeesAssignedList = [];
  studentFeesCollectionList : StudentFeesTransactionDetailsBO[] = [];
  headStats = {};
  feesDueDropdown : boolean = true;
  feesAssignedDropdown : boolean = false;
  feesReceivedDropdown : boolean = false;
  modalTxnId = "";
  modalFeesDataList = [];
  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit() {
    this.reformatStudentIdFromRouteParam();
    this.studentService.getStudentFeesDueDetails(this.studentId).subscribe(
      response => {
        this.academicId2FeesDueDetails = response;
        console.log(this.academicId2FeesDueDetails);
        this.populateStudentFeesDuesList();
        this.populateTotalDues();
      },
      error => {
        console.log("Error while fetching students fees due details");
        console.log(error);
      }
    );

    this.studentService.getStudentFeesAssignedList(this.studentId).subscribe(
      response => {
        this.academicId2FeesAssignedDetails = response;
        console.log(this.academicId2FeesAssignedDetails);
        this.populateStudentFeesAssignedList();
        this.populateTotalReceivable();
      },
      error => {
        console.log("Error while fetching student fees assigned details");
        console.log(error);
      }
    );

    this.studentService.getStudentFeesCollectionTransactions(this.studentId).subscribe(
      response => {
        this.studentFeesCollectionList = response;
        console.log(this.studentFeesCollectionList);
        this.populateTotalReceived();
      },
      error => {
        console.log("Error while fetching Student Fees Collection Transactions");
        console.log(error);
      }
    );
  }

  populateTotalReceivable(){
    let total = 0;
    for(let feeDetailsBO of this.studentFeesAssignedList){
      total += feeDetailsBO[1].amount;
    }
    this.headStats["totalReceivable"] = total;
  }

  populateTotalDues(){
    let total=0;
    for(let feeDetailsBO of this.studentFeesDuesList){
      total += feeDetailsBO[1].amount;
    }
    this.headStats['totalDue'] = total;
  }

  populateTotalReceived(){
    let total=0;
    for(let studentFeesCollectionBO of this.studentFeesCollectionList){
      total += studentFeesCollectionBO.amount;
    }
    this.headStats['totalReceived'] = total;
  }

  populateStudentFeesDuesList(){
    for(let key of Object.keys(this.academicId2FeesDueDetails)){
      for(let feeDetailsBO of this.academicId2FeesDueDetails[key]){
        let tempL = [];
        tempL.push(key);
        tempL.push(feeDetailsBO);
        this.studentFeesDuesList.push(tempL);
      }
    }
  }

  populateStudentFeesAssignedList(){
    for(let key of Object.keys(this.academicId2FeesAssignedDetails)){
      for(let feeDetailsBO of this.academicId2FeesAssignedDetails[key]){
        let tempL = [];
        tempL.push(key);
        tempL.push(feeDetailsBO);
        this.studentFeesAssignedList.push(tempL);
      }
    }
  }

  reformatStudentIdFromRouteParam() {
    let routeParam : string = this.route.snapshot.params['studentId'];
    this.studentId = routeParam.split("_")[0];
    this.studentName = routeParam.split("_")[1];
    console.log(this.studentId+" "+this.studentName);
  }

  viewTransactionDetails(feeCollectionTxn : StudentFeesTransactionDetailsBO){
    this.modalTxnId = feeCollectionTxn.collectionId;
    for(let key of Object.keys(feeCollectionTxn.academicId2FeesDetailsMap)){
      for(let feeDetails of feeCollectionTxn.academicId2FeesDetailsMap[key]){
        let tempL = [];
        tempL.push(key);
        tempL.push(feeDetails);
        this.modalFeesDataList.push(tempL);
      }
    }
  }
}
