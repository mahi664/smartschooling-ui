import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountDetailsBO, StudentFeesTransactionDetailsBO } from '../fees-receivable-details/fees-receivable-details.component';
import { AccountsService } from '../services/accounts.service';
import { StudentService } from '../services/student.service';
import { FeesDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-student-fees-new-payment',
  templateUrl: './student-fees-new-payment.component.html',
  styleUrls: ['./student-fees-new-payment.component.css']
})
export class StudentFeesNewPaymentComponent implements OnInit {

  studentId : string = "";
  academicId2FeesDuesMap = {};
  academicIds : string[] = [];
  feeTypes : FeesDetailsBO[] = [];
  studentFeesTransactionDetailsBO : StudentFeesTransactionDetailsBO;
  feePaymentRecordList = [];
  validationFlags={};
  accountIds : AccountDetailsBO[] = [];
  newRecord = {};
  studentName : string = "";

  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService,
    private accountService: AccountsService, private router: Router) { }
  
  ngOnInit() {
    this.reformatStudentIdFromRouteParam();
    this.populateDataValidationFlags();
    // this.studentId = this.activatedRoute.snapshot.params['studentId'];
    this.academicId2FeesDuesMap = this.studentService.academicId2FeesDueDetails;
    this.populateAcademicIds();
    this.studentFeesTransactionDetailsBO = new StudentFeesTransactionDetailsBO("",new Date(),0,new AccountDetailsBO("","",null,null),{});
    this.accountService.getAccountDetails().subscribe(
      response => {
        this.accountIds = response;
        console.log(this.academicIds);
      },
      error => {
        console.log("Error While Fetching account ids");
        console.log(error);
      }
    );
  }

  reformatStudentIdFromRouteParam() {
    let routeParam : string = this.activatedRoute.snapshot.params['studentId'];
    this.studentId = routeParam.split("_")[0];
    this.studentName = routeParam.split("_")[1];
    console.log(this.studentId+" "+this.studentName);
  }

  populateDataValidationFlags(){
    this.validationFlags['']
  }

  populateAcademicIds() {
    if(this.academicId2FeesDuesMap!=undefined){
      for(let key of Object.keys(this.academicId2FeesDuesMap)){
        this.academicIds.push(key);
      }
      console.log(this.academicIds);
    }
  }

  populateFeeTypesForAcademicYear(academicId: string){
    if(academicId!=undefined){
      this.feeTypes = this.academicId2FeesDuesMap[academicId];

      this.validationFlags["academicId"] = false;
    }
  }

  getDueAmountForFeeType(academicId: string, feeType: string){
    if((academicId!=" " || academicId!=undefined) && (feeType!=" " || feeType!=undefined)){
      let feeDetailsBOs : FeesDetailsBO[] = this.academicId2FeesDuesMap[academicId];
      let feeDetailsBO :FeesDetailsBO = feeDetailsBOs.filter(feeDetails => feeDetails.feeName.toLowerCase() === feeType.toLowerCase())[0];
      this.newRecord['amount'] = feeDetailsBO.amount;

      this.validationFlags['feeType'] = false;
    }
  }

  addNewFeeDetailsForPayment(){
    if(this.validateNewRecord()){
      if(this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap[this.newRecord['academicId']]===undefined){
        this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap[this.newRecord['academicId']] = [];
      }
      let tempL : FeesDetailsBO[] = this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap[this.newRecord['academicId']];
      let feeDetailsBO : FeesDetailsBO = this.academicId2FeesDuesMap[this.newRecord['academicId']].filter(feeDetails => feeDetails.feeName.toLowerCase() === this.newRecord['feeType'].toLowerCase())[0]; 
      let tempFeeDetailsBO : FeesDetailsBO = tempL.filter(feeDet => feeDet.feeName.toLowerCase()===this.newRecord['feeType'].toLowerCase())[0];
      if(this.newRecord['amount']!=0){
        if(tempFeeDetailsBO===undefined){
          tempFeeDetailsBO = new FeesDetailsBO(feeDetailsBO.feeId,feeDetailsBO.feeName,null,null,null,0,null,null);
          tempL.push(tempFeeDetailsBO);
        }
        tempFeeDetailsBO.amount += this.newRecord['amount']
        feeDetailsBO.amount -= this.newRecord['amount'];
        this.studentFeesTransactionDetailsBO.amount += this.newRecord['amount'];
        this.populateFeePaymentRecordList();
        this.newRecord = {};
      }else{
        alert("There is no due amount for this combination");
      }
    }else{
      alert("Please fill all the required details before adding new record");
    }
  }

  validateNewRecord() {
    let retFlag = true;
    if(this.newRecord['academicId']==="" || this.newRecord['academicId']===undefined){
      this.validationFlags["academicId"] = true;
      retFlag = false;
    }
    if(this.newRecord['feeType']==="" || this.newRecord['feeType']===undefined){
      this.validationFlags["feeType"] = true;
      retFlag = false;
    }
    return retFlag;
  }

  populateFeePaymentRecordList(){
    this.feePaymentRecordList = [];
    for(let academicId of Object.keys(this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap)){
      for(let feeDetailsBO of this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap[academicId]){
        let temp = [];
        temp.push(academicId);
        temp.push(feeDetailsBO);
        this.feePaymentRecordList.push(temp);
      }
    }
  }

  saveNewPayment(){
    if(this.validateStudentFeesTransactionDetaila()){
      this.studentService.addNewStudentFeesTransaction(this.studentId, this.studentFeesTransactionDetailsBO).subscribe(
        response => {
          console.log(response);
          this.studentFeesTransactionDetailsBO = response;
          alert("Transaction Successful! Your Transaction Id is : "+ this.studentFeesTransactionDetailsBO.collectionId);
          this.router.navigate(["fees-receivable/details", this.studentId+"_"+this.studentName]);
        }
      );
    }else{
      alert("Please fill all the required details");
    }
  }

  validateStudentFeesTransactionDetaila(){
    let retFlag = true;
    if(this.studentFeesTransactionDetailsBO.collectionDate === null){
      this.validationFlags["collectionDate"] = true;
      retFlag = false;
    }
    if(this.studentFeesTransactionDetailsBO.accountsDetailsBO['accountId']==="" 
        || this.studentFeesTransactionDetailsBO.accountsDetailsBO['accountId']===undefined){
      this.validationFlags["accountDetails"] = true;
      retFlag = false;
    }
    if(retFlag && Object.keys(this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap).length==0){
        alert("Please add atleast one record for payment");
        retFlag = false;
      }
    return retFlag;
  }

  validateField(field: string, value: string){
    if(value!=" " && value!=undefined){
      this.validationFlags['accountDetails'] = false;
    }
  }

  cancelNewPayment(){
    this.router.navigate(["fees-receivable/details", this.studentId+"_"+this.studentName]);
  }

  removeFeePaymentFromList(academicId: string, feeType: string){
    let tempL : FeesDetailsBO[] = this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap[academicId];
    let removedFeeObj : FeesDetailsBO = tempL.filter(feeDet => feeDet.feeName.toLowerCase()===feeType.toLowerCase())[0];
    tempL = tempL.filter(feeDet => feeDet.feeName.toLowerCase()!=feeType.toLowerCase());
    this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap[academicId] = tempL;
    this.feePaymentRecordList = this.feePaymentRecordList.filter(feeDet => feeDet[1].feeName.toLowerCase()!=feeType.toLowerCase())
    this.studentFeesTransactionDetailsBO.amount-=removedFeeObj.amount;

    let dueFeeListForAcademicId : FeesDetailsBO[] = this.academicId2FeesDuesMap[academicId];
    let dueFeeObjToUpdate = dueFeeListForAcademicId.filter(feeDet => feeDet.feeName.toLowerCase() === feeType.toLowerCase())[0];
    dueFeeObjToUpdate.amount+=removedFeeObj.amount;
  }
}
