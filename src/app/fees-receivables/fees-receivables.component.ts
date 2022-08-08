import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../services/classes.service';
import { StudentService } from '../services/student.service';
import { ClassesDetailsBO, FeeReceivables, FilterDto, StudentDetailsBO } from '../student-list/student-list.component';

export class FeeReceivableDetailsDto{
  constructor(public studentId: string, public genRegNo: number, public firstName: string,
    public middleName: string, public lastName: string, public mobileNumber: string, public totalAmnt: number,
    public dueAmnt: number, public paidAmnt: number){}
}

export class FeeReceivableStatsDto{
  constructor(public totalAmnt: number, public paidAmnt: number, public dueAmnt: number){}
}

@Component({
  selector: 'app-fees-receivables',
  templateUrl: './fees-receivables.component.html',
  styleUrls: ['./fees-receivables.component.css']
})
export class FeesReceivablesComponent implements OnInit {

  currentAcademicId : string = "AY-2021-22";
  classesList : ClassesDetailsBO[] = [];

  feeReceivableDetailsDtoList: FeeReceivableDetailsDto[] = [];
  page = 0;
  size = 15;
  pageArray = [];
  currentPage = 1;
  filterDto: FilterDto = new FilterDto([], [], [], [], "", "", "", "");
  feeReceivableStats: FeeReceivableStatsDto = new FeeReceivableStatsDto(0,0,0);

  constructor(private classesService: ClassesService, private studentService: StudentService,
    private router: Router) { }

  ngOnInit() {
    this.classesService.getClassesNames().subscribe(
      response=>{
        this.classesList = response;
      },
      error=>{
        console.log(error);
      }
    );

    this.studentService.getFeeReceivableDetails(this.page, this.size, this.filterDto).subscribe(
      response => {
        this.feeReceivableDetailsDtoList = response.success.data;
        console.log(this.feeReceivableDetailsDtoList);
        for (let i = 0; i < response.success.totalPages; i++) {
          this.pageArray.push(i + 1);
        }
        this.currentPage = response.success.currentPage + 1;
      },
      error => {
        console.info(error);
        alert("Error while getting fee receivables");
      }
    );

    this.studentService.getFeeReceivableStats().subscribe(
      response => {
        console.log(response);
        this.feeReceivableStats = response.success.data;
      }
    );
  }

  loadPageData(page: number) {
    if (page <= 0) {
      page = 1;
    } else if (page > this.pageArray.length) {
      page = this.pageArray.length;
    }
    this.studentService.getFeeReceivableDetails(page-1, this.size, this.filterDto).subscribe(
      response => {
        this.feeReceivableDetailsDtoList = response.success.data;
        console.log(this.feeReceivableDetailsDtoList);
        this.currentPage = response.success.currentPage + 1;
      },
      error => {
        console.info(error);
        alert("Error while getting fee receivables");
      }
    );
  }

  applyFilter() {
    this.studentService.getFeeReceivableDetails(this.page, this.size, this.filterDto).subscribe(
      response => {
        this.feeReceivableDetailsDtoList = response.success.data;
        console.log(this.feeReceivableDetailsDtoList);
        this.currentPage = response.success.currentPage + 1;
      },
      error => {
        console.info(error);
        alert("Error while getting fee receivables");
      }
    )
  }

  feeReceivablesDetails(student: StudentDetailsBO){
    let param = student.studentId+"_"+student.firstName+" "+student.middleName+" "+student.lastName;
    this.router.navigate(["/fees-receivable/details", param]);
  }

}
