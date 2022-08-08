import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../services/classes.service';
import { CommonService } from '../services/common.service';
import { StudentService } from '../services/student.service';
import { TransportationService } from '../services/transportation.service';

export class AcademicDetailsBO {
  constructor(public academicId: String, public academicYear: String, public displayName: string,
    public academicStartDate: Date, public academicEndDate: Date) { }
}

export class ClassesDetailsBO {
  constructor(public classId: string, public className: string, public subjects: SubjectDetailsBO[]) { }
}

export class FeesDetailsBO {
  constructor(public feeId: string, public feeName: string, public feeDiscription: string,
    public classId: string, public routeId: string, public amount: number, public effDate: Date,
    public endDate: Date) { }
}

export class RouteDetailsBO {
  constructor(public routeId: string, public source: string, public destination: string,
    public distance: number) { }
}

export class SubjectDetailsBO {
  constructor(public subjectId: string, public subjectName: string) { }
}

export class FeeReceivables {
  constructor(public totalFee: number, public dueAmount: number, public paidAmount: number) { }
}

export class StudentDetailsBO {
  constructor(public studentId: string, public firstName: string, public middleName: string, public lastName: string,
    public birthDate: Date, public address: string, public mobileNumber: string, public email: string, public alternateMobileNumber: string,
    public gender: string, public religion: string, public caste: string, public nationality: string,
    public adharNumber: string, public routeDetailsBO: RouteDetailsBO, public studentClassDetails: {},
    public studentFeeDetails: {}, public transportOpted: boolean, public feeReceivables: FeeReceivables) { }
}

export class ResponseDto {
  constructor(public success: SuccessDto, public error: ErrorDto) { }
}

export class SuccessDto {
  constructor(public successCode: string, public successMessage: string, public currentPage: number,
    public totalItems: number, public totalPages: number, public data: any) { }
}

export class ErrorDto {
  constructor(public errorCode: string, public errorMessage: string, public errorMessages: []) { }
}

export class FilterDto {
  constructor(public classIds: {}, public routeIds: {}, public castes: {}, public religions: {},
    public gender: string, public transportOpted: string, public sortOrder: string, public quickSearchText: string) { }
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentsList: StudentDetailsBO[] = [];
  studentsListOrg: StudentDetailsBO[] = [];
  currentAcademicId: string = "AY-2022-23";
  isFilterExpanded = false;
  filteredData = {};
  classesList: ClassesDetailsBO[] = [];
  newStudentList = [];
  pageArray = [];
  currentPage = 1;
  page = 0;
  size = 15;
  studentListSuccessResponse: SuccessDto;
  pagedStudents: any[] = [];
  routesDetails: RouteDetailsBO[] = [];
  filterDto: FilterDto = new FilterDto([], [], [], [], "", "", "", "");
  castes: string[] = ['OPEN', 'OBC', 'NT-A', 'NT-B', 'NT-C', 'NT-D', 'SC', 'ST'];
  religions: string[] = ['HINDU', 'MUSLIM', 'CHRISTIAN'];
  constructor(private studentService: StudentService, private router: Router,
    private transportationService: TransportationService, private classesService: ClassesService) { }

  ngOnInit() {

    this.classesService.getClassesNames().subscribe(
      response => {
        this.classesList = response;
        // console.log(this.classesList);
      },
      error => {
        console.log(error);
      }
    );
    this.transportationService.getRoutes().subscribe(
      response => {
        this.routesDetails = response;
      },
      error => {
        console.log(error);
      }
    );
    console.log('getting students list...');
    this.studentService.getStudentsList(this.page, this.size, this.filterDto).subscribe(
      response => {
        this.studentListSuccessResponse = response.success;
        console.log(this.studentListSuccessResponse);
        for (let i = 0; i < this.studentListSuccessResponse.totalPages; i++) {
          this.pageArray.push(i + 1);
        }
        this.currentPage = this.studentListSuccessResponse.currentPage + 1;
        this.pagedStudents = this.studentListSuccessResponse.data;
      },
      error => {
        console.log("Error in fetching student list : " + error);
        alert("Error While Fetching Student List ! Please Contact System Administrator")
      }
    );
  }

  loadPageData(page: number) {
    if (page <= 0) {
      page = 1;
    } else if (page > this.pageArray.length) {
      page = this.pageArray.length;
    }
    this.studentService.getStudentsList(page - 1, this.size, this.filterDto).subscribe(
      response => {
        this.studentListSuccessResponse = response.success;
        console.log(this.studentListSuccessResponse);
        this.pagedStudents = this.studentListSuccessResponse.data;
        this.currentPage = this.studentListSuccessResponse.currentPage + 1;
      },
      error => {
        console.log("Error in fetching student list");
        console.log(error);
        alert("Error While Fetching Student List ! Please Contact System Administrator")
      }
    );
  }

  newStudentRegistration() {
    this.router.navigate(['/student-registration']);
  }

  filterStudentsOnAddressChange() {
    console.log("Filtering students on address change");
    if (this.filteredData['address'] === undefined || this.filteredData['address'] === " ") {
      this.studentsList = this.studentsListOrg;
    }
    if (this.filteredData['address'] != undefined) {
      this.studentsList = this.studentsListOrg.filter(
        student => student.address.toLowerCase().includes(this.filteredData['address'].toLowerCase())
      );
    }
  }

  applyFilter() {
    console.log("Applying filters");
    this.studentService.getStudentsList(this.page, this.size, this.filterDto).subscribe(
      response => {
        this.studentListSuccessResponse = response.success;
        console.log(this.studentListSuccessResponse);
        this.pageArray = [];
        for (let i = 0; i < this.studentListSuccessResponse.totalPages; i++) {
          this.pageArray.push(i + 1);
        }
        this.currentPage = this.studentListSuccessResponse.currentPage + 1;
        this.pagedStudents = this.studentListSuccessResponse.data;
      },
      error => {
        console.log("Error in fetching student list : " + error);
        alert("Error While Fetching Student List ! Please Contact System Administrator")
      }
    );
  }

  clearFilter() {
    this.filterDto = new FilterDto([],[],[],[], "", "", "", "");
    this.studentService.getStudentsList(this.page, this.size, this.filterDto).subscribe(
      response => {
        this.studentListSuccessResponse = response.success;
        console.log(this.studentListSuccessResponse);
        this.pageArray = [];
        for (let i = 0; i < this.studentListSuccessResponse.totalPages; i++) {
          this.pageArray.push(i + 1);
        }
        this.currentPage = this.studentListSuccessResponse.currentPage + 1;
        this.pagedStudents = this.studentListSuccessResponse.data;
      },
      error => {
        console.log("Error in fetching student list : " + error);
        alert("Error While Fetching Student List ! Please Contact System Administrator")
      }
    );
  }

  printStudentData() {
    const printContent = document.getElementById("printContent");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
}
