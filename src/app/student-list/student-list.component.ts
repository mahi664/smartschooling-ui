import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { StudentService } from '../services/student.service';

export class AcademicDetailsBO{
  constructor(public academicId:String, public academicYear: String){}
}

export class ClassesDetailsBO{
  constructor(public classId: string, public className: string){}
}

export class FeesDetailsBO{
  constructor(public feeId: string, public feeName: string, public feeDiscription: string,
    public classId: string, public routeId: string, public amount: number){}
}

export class RouteDetailsBO{
  constructor(public routeId:string, public source: string, public destination: string, 
    public distance: number){}
}

export class StudentDetailsBO{
  constructor(public studentId : string, public firstName: string, public middleName: string, public lastName: string, 
    public birthDate: Date, public address: string, public mobileNumber: string, public alternateMobileNumber : string,
    public gender: string, public religion: string, public caste: string, public subCast: string,
    public adharNumber: string, public routeDetailsBO: RouteDetailsBO, public studentClassDetails: {},
    public studentFeeDetails : {}, public transportOpted : boolean){}
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentsList : StudentDetailsBO[] = [];
  currentAcademicId : string = "AY-2021-22";
  constructor(private studentService: StudentService, private router: Router, 
    private commonService : CommonService) { }

  ngOnInit() {
    console.log('getting students list...');
    this.studentService.getStudentsList().subscribe(
      response=>{
        this.studentsList = response;
        this.studentService.studentList = this.studentsList
        console.log(this.studentsList);
      },
      error=>{
        console.log("Error in fetching student list : "+error);
        alert("Error While Fetching Student List ! Please Contact System Administrator")
      }
    );
  }

  editStudentDetails(student: StudentDetailsBO ){
    // console.log('Editing student : '+ student.firstName);
    let studentId ;
    if(student===undefined)
      studentId=-1;
    else
      studentId = student.studentId;
    this.router.navigate(['/student-details',studentId]);
  }

  printStudentData(){
    document.getElementById("sideNav").style.display="none";
    document.getElementById("topNav").style.display="none";
    document.getElementById("students-list").style.display="none";
    document.getElementById("modal-header").style.display="none";
    document.getElementById("modal-footer").style.display="none";

    window.print();
    
    document.getElementById("sideNav").style.display="block";
    document.getElementById("topNav").style.display="block";
    document.getElementById("students-list").style.display="block";
    document.getElementById("modal-header").style.display="block";
    document.getElementById("modal-footer").style.display="inline-block";
  }

  // dateFormat(date : Date){
  //   return this.commonService.dateFormat(date);
  // }
}
