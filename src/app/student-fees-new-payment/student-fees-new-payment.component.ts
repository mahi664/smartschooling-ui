import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountDetailsBO, StudentFeesDueDetailsDto, StudentFeesReceivableDetailsDto, StudentFeesTransactionDetailsBO } from '../fees-receivable-details/fees-receivable-details.component';
import { AccountsService } from '../services/accounts.service';
import { StudentService } from '../services/student.service';
import { FeesDetailsBO } from '../student-list/student-list.component';

export class StudentFeesPaidTrxnDetailsDto {
  constructor(public academicId: string, public feeId: string, public feeName: string, public amount: number) { }
}

export class StudentFeesPaidTrxnRequestDto {
  constructor(public trxnDate: Date, public accountId: string,
    public feesPaidTrxnDetailsDtos: StudentFeesPaidTrxnDetailsDto[]) { }
}

export class StudentFeesPaidTrxnResponseDto {
  constructor(public transactionId: string, public amount: number, public trxnDate: Date){}
}

@Component({
  selector: 'app-student-fees-new-payment',
  templateUrl: './student-fees-new-payment.component.html',
  styleUrls: ['./student-fees-new-payment.component.css']
})
export class StudentFeesNewPaymentComponent implements OnInit {

  studentId: string = "";
  studentFeesReceivableDetails: StudentFeesReceivableDetailsDto;
  academicIds: string[] = [];
  feeTypes: FeesDetailsBO[] = [];
  studentFeesTransactionDetailsBO: StudentFeesTransactionDetailsBO;
  feePaymentRecordList = [];
  validationFlags = {};
  accountIds: AccountDetailsBO[] = [];
  studentFeesPaidTrxnRequest: StudentFeesPaidTrxnRequestDto = new StudentFeesPaidTrxnRequestDto(new Date(), "", []);
  studentName: string = "";
  mobileNumber: string = "";
  address: string = "";
  newFeeDetails: StudentFeesPaidTrxnDetailsDto = new StudentFeesPaidTrxnDetailsDto("", "","",0);
  studentFeesPaidTrxnResponseDto: StudentFeesPaidTrxnResponseDto;

  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService,
    private accountService: AccountsService, private router: Router) { }

  ngOnInit() {
    this.reformatStudentIdFromRouteParam();
    this.populateDataValidationFlags();
    // this.studentId = this.activatedRoute.snapshot.params['studentId'];
    this.studentFeesReceivableDetails = this.studentService.studentFeesReceivableDetails;
    this.populateAcademicIds();
    this.studentFeesTransactionDetailsBO = new StudentFeesTransactionDetailsBO("", new Date(), 0, new AccountDetailsBO("", "", null, null), {});
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
    let routeParam: string = this.activatedRoute.snapshot.params['studentId'];
    this.studentId = routeParam.split("_")[0];
    this.studentName = routeParam.split("_")[1];
    this.mobileNumber = routeParam.split("_")[2];
    this.address = routeParam.split("_")[3];
    console.log(this.studentId + " " + this.studentName);
  }

  populateDataValidationFlags() {
    this.validationFlags['']
  }

  populateAcademicIds() {
    if (this.studentFeesReceivableDetails != undefined) {
      this.academicIds = this.studentFeesReceivableDetails.feesDueDetails.map(data => data.academicYear)
        .filter((value, index, self) => self.indexOf(value) === index)
      console.log(this.academicIds);
    }
  }

  populateFeeTypesForAcademicYear(academicId: string) {
    if (academicId != undefined) {
      this.feeTypes = this.studentFeesReceivableDetails.feesDueDetails.filter(data => data.academicYear === academicId && data.amount>0)
        .map(data => new FeesDetailsBO(data.feeId, data.feeName, null, null, null, 0, null, null));
      console.log(this.feeTypes);
      this.validationFlags["academicId"] = false;
    }
  }

  getDueAmountForFeeType(academicId: string, feeType: string) {
    if ((academicId != " " || academicId != undefined) && (feeType != " " || feeType != undefined)) {
      this.newFeeDetails.amount = this.studentFeesReceivableDetails.feesDueDetails.filter(data => data.academicYear === academicId &&
        data.feeName.toLowerCase() === feeType.toLowerCase()).map(data => data.amount)[0];

      this.validationFlags['feeType'] = false;
    }
  }

  addNewFeeDetailsForPayment() {
    if (this.validateNewRecord()) {

      let feeDetailsDto: StudentFeesPaidTrxnDetailsDto = this.studentFeesPaidTrxnRequest.feesPaidTrxnDetailsDtos
        .filter(data => (data.academicId === this.newFeeDetails.academicId &&
          data.feeName.toLowerCase() === this.newFeeDetails.feeName.toLowerCase()))[0];
      if(feeDetailsDto === undefined || feeDetailsDto === null) {
        this.studentFeesPaidTrxnRequest.feesPaidTrxnDetailsDtos.push(this.newFeeDetails);
      } else{
        feeDetailsDto.amount += this.newFeeDetails.amount;
      }

      let studentFeesDueDetails: StudentFeesDueDetailsDto = this.studentFeesReceivableDetails.feesDueDetails.filter(data => data.academicYear === this.newFeeDetails.academicId
        && data.feeName.toLowerCase() === this.newFeeDetails.feeName.toLowerCase())[0];
      studentFeesDueDetails.amount -= this.newFeeDetails.amount;
      this.newFeeDetails.feeId = studentFeesDueDetails.feeId;
      console.log(this.newFeeDetails);
      console.log(this.studentFeesPaidTrxnRequest);
      this.newFeeDetails = new StudentFeesPaidTrxnDetailsDto("", "", "", 0);

      // if (this.studentFeesReceivableDetails.feesDueDetails[this.newFeeDetails['academicId']] === undefined) {
      //   this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap[this.newFeeDetails['academicId']] = [];
      // }
      // let tempL: FeesDetailsBO[] = this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap[this.newRecord['academicId']];
      // let feeDetailsBO: FeesDetailsBO = this.academicId2FeesDuesMap[this.newRecord['academicId']].filter(feeDetails => feeDetails.feeName.toLowerCase() === this.newRecord['feeType'].toLowerCase())[0];
      // let tempFeeDetailsBO: FeesDetailsBO = tempL.filter(feeDet => feeDet.feeName.toLowerCase() === this.newRecord['feeType'].toLowerCase())[0];
      // if (this.newRecord['amount'] != 0) {
      //   if (tempFeeDetailsBO === undefined) {
      //     tempFeeDetailsBO = new FeesDetailsBO(feeDetailsBO.feeId, feeDetailsBO.feeName, null, null, null, 0, null, null);
      //     tempL.push(tempFeeDetailsBO);
      //   }
      //   tempFeeDetailsBO.amount += this.newRecord['amount']
      //   feeDetailsBO.amount -= this.newRecord['amount'];
      //   this.studentFeesTransactionDetailsBO.amount += this.newRecord['amount'];
      //   this.populateFeePaymentRecordList();
      //   this.newRecord = {};
      // } else {
      //   alert("There is no due amount for this combination");
      // }
    } else {
      alert("Please fill all the required details before adding new record");
    }
  }

  validateNewRecord() {
    let retFlag = true;
    if (this.newFeeDetails['academicId'] === "" || this.newFeeDetails['academicId'] === undefined) {
      this.validationFlags["academicId"] = true;
      retFlag = false;
    }
    if (this.newFeeDetails['feeName'] === "" || this.newFeeDetails['feeName'] === undefined) {
      this.validationFlags["feeType"] = true;
      retFlag = false;
    }
    let studentFeesDueDetails: StudentFeesDueDetailsDto  = this.studentFeesReceivableDetails.feesDueDetails.filter(data => data.academicYear === this.newFeeDetails.academicId
      && data.feeName.toLowerCase() === this.newFeeDetails.feeName.toLowerCase())[0]
    if(this.newFeeDetails.amount<=0 || (studentFeesDueDetails!=undefined && this.newFeeDetails.amount>studentFeesDueDetails.amount)){
      this.validationFlags["amount"] = true;
      retFlag = false;
    }
    return retFlag;
  }

  populateFeePaymentRecordList() {
    this.feePaymentRecordList = [];
    for (let academicId of Object.keys(this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap)) {
      for (let feeDetailsBO of this.studentFeesTransactionDetailsBO.academicId2FeesDetailsMap[academicId]) {
        let temp = [];
        temp.push(academicId);
        temp.push(feeDetailsBO);
        this.feePaymentRecordList.push(temp);
      }
    }
  }

  saveNewPayment() {
    if (this.validateStudentFeesTransactionDetaila()) {
      this.studentService.addNewStudentFeesTransaction(this.studentId, this.studentFeesPaidTrxnRequest).subscribe(
        response => {
          console.log(response);
          this.studentFeesPaidTrxnResponseDto = response.success.data;
          alert("Transaction Successful! Your Transaction Id is : " + this.studentFeesPaidTrxnResponseDto.transactionId);
          this.router.navigate(["fees-receivable/details", this.studentId + "_" + this.studentName]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      alert("Please fill all the required details");
    }
  }

  validateStudentFeesTransactionDetaila() {
    let retFlag = true;
    if (this.studentFeesPaidTrxnRequest.trxnDate === null) {
      this.validationFlags["collectionDate"] = true;
      retFlag = false;
    }
    if (this.studentFeesPaidTrxnRequest.accountId === ""
      || this.studentFeesPaidTrxnRequest.accountId === undefined) {
      this.validationFlags["accountDetails"] = true;
      retFlag = false;
    }
    if (retFlag && this.studentFeesPaidTrxnRequest.feesPaidTrxnDetailsDtos.length == 0) {
      alert("Please add atleast one record for payment");
      retFlag = false;
    }
    return retFlag;
  }

  validateField(field: string, value: string) {
    if (value != " " && value != undefined) {
      this.validationFlags['accountDetails'] = false;
    }
  }

  cancelNewPayment() {
    this.router.navigate(["fees-receivable/details", this.studentId + "_" + this.studentName]);
  }

  removeFeePaymentFromList(feeDetails: StudentFeesPaidTrxnDetailsDto) {
    this.studentFeesPaidTrxnRequest.feesPaidTrxnDetailsDtos = this.studentFeesPaidTrxnRequest.feesPaidTrxnDetailsDtos
    .filter(data => !(data.academicId===feeDetails.academicId && data.feeName.toLowerCase()===feeDetails.feeName.toLowerCase()))

    let studentFeesDueDetails: StudentFeesDueDetailsDto = this.studentFeesReceivableDetails.feesDueDetails.filter(data => data.academicYear === feeDetails.academicId
      && data.feeName.toLowerCase() === feeDetails.feeName.toLowerCase())[0];
    studentFeesDueDetails.amount += feeDetails.amount;
  }
}
