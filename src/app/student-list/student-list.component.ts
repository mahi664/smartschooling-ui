import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../services/classes.service';
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
  studentsListOrg : StudentDetailsBO[] = [];
  currentAcademicId : string = "AY-2021-22";
  isFilterExpanded = false;
  filteredData = {};
  classesList : ClassesDetailsBO[] = [];
  constructor(private studentService: StudentService, private router: Router, 
    private commonService : CommonService, private classesService : ClassesService) { }

  ngOnInit() {

    this.classesService.getClassesNames().subscribe(
      response=>{
        this.classesList = response;
        // console.log(this.classesList);
      },
      error=>{
        console.log(error);
      }
    );
    console.log('getting students list...');
    this.studentService.getStudentsList().subscribe(
      response=>{
        this.studentsListOrg = response;
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

  filterStudentsOnAddressChange(){
    console.log("Filtering students on address change");
    if(this.filteredData['address']===undefined || this.filteredData['address']===" "){
      this.studentsList = this.studentsListOrg;
    }
    if(this.filteredData['address']!=undefined){
      this.studentsList = this.studentsListOrg.filter(
        student => student.address.toLowerCase().includes(this.filteredData['address'].toLowerCase())
      );
    }
  }

  applyFilter(){
    this.studentsList = this.studentsListOrg;
    
    if(this.filteredData['address']!=undefined && this.filteredData['address']!=" "){
      this.studentsList = this.studentsList.filter(
        student => student.address.toLowerCase().includes(this.filteredData['address'].toLowerCase())
      );
    }
    
    if(this.filteredData['classId']!=undefined && this.filteredData['classId']!=" "){
      this.studentsList = this.studentsList.filter(
        student=>student.studentClassDetails[this.currentAcademicId][0].classId===this.filteredData['classId']
      );
    }

    if(this.filteredData['transportOpted']!=undefined && this.filteredData['transportOpted']!=" "){
      let transportOpted = this.filteredData['transportOpted'] === "YES" ? true : false;
      this.studentsList = this.studentsList.filter(
        student=>student.transportOpted === transportOpted
      );
    }

    if(this.filteredData['gender']!=undefined && this.filteredData['gender']!=" "){
      this.studentsList = this.studentsList.filter(
        student=>student.gender.toLowerCase() === this.filteredData['gender'].toLowerCase()
      );
    }

    if(this.filteredData['caste']!=undefined && this.filteredData['caste']!=" "){
      this.studentsList = this.studentsList.filter(
        student=>student.caste.toLowerCase() === this.filteredData['caste'].toLowerCase()
      );
    }
  }

  clearFilter(){
    this.filteredData = {};
    this.studentsList = this.studentsListOrg;
  }

  printStudentData(){
    // document.getElementById("sideNav").style.visibility="hidden";
    // document.getElementById("topNav").style.visibility="hidden";
    // document.getElementById("students-list").style.visibility="hidden";
    // document.getElementById("modal-header").style.visibility="hidden";
    // document.getElementById("modal-footer").style.visibility="hidden";
    
    // document.getElementById("model-body").classList.remove();
    
    // window.print();
    
    // document.getElementById("sideNav").style.visibility="visible";
    // document.getElementById("topNav").style.visibility="visible";
    // document.getElementById("students-list").style.visibility="visible";
    // document.getElementById("modal-header").style.visibility="visible";
    // document.getElementById("modal-footer").style.visibility="visible";

    const printContent = document.getElementById("printContent");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

  // dateFormat(date : Date){
  //   return this.commonService.dateFormat(date);
  // }
}
