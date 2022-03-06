import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export class LeaveDetails {
  constructor(public leaveId: string, public leaveName: string, public leaveDescription: string,
    public accrualFreq: string, public accrualDay: number, public amount: number, public startDate: Date,
    public endDate: Date) {}
}

@Component({
  selector: 'app-new-leave-type',
  templateUrl: './new-leave-type.component.html',
  styleUrls: ['./new-leave-type.component.css']
})
export class NewLeaveTypeComponent implements OnInit {

  leaveDetails : LeaveDetails = new LeaveDetails("","","","",0,0,null,null);
  accrualFrequency : string[] = ["Daily","Weekly","Monthly","Quarterly","Yearly"];
  accrualDays : number[] = [1,2,3,4,5,6,7,8,9,10];
  isAccrualDayApplicable : boolean = false;
  leaveId : string = "";
  validationFlags = {};

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initValidationFlags();
    this.leaveId = this.activatedRoute.snapshot.params['leaveId'];
    console.log(this.leaveId);
  }

  saveLeaveType(){
    console.log("Adding new Leave Details", this.leaveDetails);
    if(this.validateLeaveDetails()){

    }else{
      alert("Please Fill all the required Details!");
    }
  }

  initValidationFlags(){
    this.validationFlags['leaveName'] = false;
    this.validationFlags['accrualFreq'] = false;
    this.validationFlags['accrualDay'] = false;
    this.validationFlags['amount'] = false;
  }

  validateField(field : string, value : string){
    this.validationFlags[field]= value==="" ? true : false;
    if(field==="accrualFreq"){
      value!="Daily" ? this.isAccrualDayApplicable = true : this.isAccrualDayApplicable = false;
    }
  }

  validateLeaveDetails(){
    let retFlag = true;
    if(this.leaveDetails.leaveName==="" || this.leaveDetails.leaveName===undefined){
      this.validationFlags['leaveName'] = true;
      retFlag = false;
    }
    if(this.leaveDetails.accrualFreq==="" || this.leaveDetails.accrualFreq===undefined){
      this.validationFlags['accrualFreq'] = true;
      retFlag = false;
    }else{
      if(this.leaveDetails.accrualDay===0 || this.leaveDetails.accrualDay===undefined){
        this.validationFlags['accrualDay'] = true;
        retFlag = false;
      }
    }
    if(this.leaveDetails.amount===0 || this.leaveDetails.amount===undefined){
      this.validationFlags['amount'] = true;
      retFlag = false;
    }

    return retFlag;
  }
}
