import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../services/classes.service';
import { StudentService } from '../services/student.service';
import { ClassesDetailsBO, FeeReceivables, StudentDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-fees-receivables',
  templateUrl: './fees-receivables.component.html',
  styleUrls: ['./fees-receivables.component.css']
})
export class FeesReceivablesComponent implements OnInit {

  isFilterExpanded = false;
  studentsList : StudentDetailsBO[] = [];
  studentsListOrg : StudentDetailsBO[] = [];
  currentAcademicId : string = "AY-2021-22";
  headStats = {};
  classesList : ClassesDetailsBO[] = [];
  filteredData = {};
  constructor(private classesService: ClassesService, private studentService: StudentService,
    private router: Router) { }

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

    this.studentService.getStudentReceivables().subscribe(
      response => {
        this.studentsList = response;
        this.studentsListOrg = response;
        console.log(this.studentsList);
        this.populateHeadStats();
      }
    );
  }

  populateHeadStats() {
    let totalFees = 0;
    let totalPaidAmount = 0;
    let totalDueAmount = 0;

    for(let student of this.studentsList){
      totalFees += student.feeReceivables.totalFee;
      totalPaidAmount += student.feeReceivables.paidAmount;
      totalDueAmount += student.feeReceivables.dueAmount;
    }

    this.headStats["totalReceivable"] = totalFees;
    this.headStats["totalReceived"] = totalPaidAmount;
    this.headStats["totalDue"] = totalDueAmount;
  }

  feeReceivablesDetails(student: StudentDetailsBO){
    let param = student.studentId+"_"+student.firstName+" "+student.middleName+" "+student.lastName;
    this.router.navigate(["/fees-receivable/details", param]);
  }

  filterStudentsOnNameChange(){
    console.log("Filtering students on Name change");
    if(this.filteredData['studentName']===undefined || this.filteredData['studentName']===" "){
      this.studentsList = this.studentsListOrg;
    }
    if(this.filteredData['studentName']!=undefined){
      this.studentsList = this.studentsListOrg.filter(
        student => (
          student.firstName.toLowerCase().includes(this.filteredData['studentName'].toLowerCase()) ||
          student.middleName.toLowerCase().includes(this.filteredData['studentName'].toLowerCase()) ||
          student.lastName.toLowerCase().includes(this.filteredData['studentName'].toLowerCase())
        )
      );
    }
  }

  applyFilter(){
    this.studentsList = this.studentsListOrg;
    
    if(this.filteredData['studentName']!=undefined && this.filteredData['studentName']!=" "){
      this.studentsList = this.studentsList.filter(
        student => (
          student.firstName.toLowerCase().includes(this.filteredData['studentName'].toLowerCase()) ||
          student.middleName.toLowerCase().includes(this.filteredData['studentName'].toLowerCase()) ||
          student.lastName.toLowerCase().includes(this.filteredData['studentName'].toLowerCase())
        )
      );
    }
    
    if(this.filteredData['classId']!=undefined && this.filteredData['classId']!=" "){
      this.studentsList = this.studentsList.filter(
        student=>student.studentClassDetails[this.currentAcademicId][0].classId===this.filteredData['classId']
      );
    }
  }

  clearFilter(){
    this.filteredData = {};
    this.studentsList = this.studentsListOrg;
  }

}
