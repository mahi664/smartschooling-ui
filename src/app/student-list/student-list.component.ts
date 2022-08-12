import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ClassesService } from '../services/classes.service';
import { CommonService } from '../services/common.service';
import { StudentService } from '../services/student.service';
import { TransportationService } from '../services/transportation.service';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

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
  totalItems;
  studentListSuccessResponse: SuccessDto;
  pagedStudents: any[] = [];
  routesDetails: RouteDetailsBO[] = [];
  filterDto: FilterDto = new FilterDto([], [], [], [], "", "", "", "");
  castes: string[] = ['OPEN', 'OBC', 'NT-A', 'NT-B', 'NT-C', 'NT-D', 'SC', 'ST'];
  religions: string[] = ['HINDU', 'MUSLIM', 'CHRISTIAN'];
  constructor(private studentService: StudentService, private router: Router,
    private transportationService: TransportationService, private classesService: ClassesService,
    private datePipe: DatePipe) { }

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
        this.totalItems = this.studentListSuccessResponse.totalItems;
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

  exportData(exportTo: string) {
    let exportData: StudentDetailsBO[];
    this.studentService.getStudentsList(0, this.totalItems, this.filterDto).subscribe(
      response => {
        this.studentListSuccessResponse = response.success;
        console.log(this.studentListSuccessResponse);
        if(exportTo === 'PDF' || exportTo === "PRINT") {
          this.exportDataToPdf(this.studentListSuccessResponse.data, 
            exportTo === "PRINT" ? true : false);
        } else if(exportTo === 'XLSX') {
          this.exportToXlsx(this.studentListSuccessResponse.data);
        }
      },
      error => {
        console.log("Error in fetching student list : " + error);
        alert("Error While Fetching Student List ! Please Contact System Administrator")
      }
    );
    
  }

  exportDataToPdf(exportData, isPrint: boolean) {
    let doc = new jsPDF("l");
    let array = [];
    for(let i=0; i<exportData.length; i++) {
      let arr = [];
      arr.push(i+1);
      arr.push(exportData[i].genRegNo);
      arr.push(exportData[i].firstName + " "+ exportData[i].middleName + " " + exportData[i].lastName);
      arr.push(this.datePipe.transform(exportData[i].birthDate, 'dd-MM-yyyy'));
      arr.push(exportData[i].adharNumber);
      arr.push(exportData[i].gender);
      arr.push(exportData[i].religion);
      arr.push(exportData[i].caste);
      arr.push(exportData[i].classDet.id);
      arr.push(exportData[i].mobileNumber);
      arr.push(exportData[i].address);
      arr.push(exportData[i].transportOpted ? 'Y' : 'N');
      array.push(arr);
    }
    autoTable(doc, {
      head: [['#', 'Reg No', 'Name', 'Birth Date', 'Adhar Number', 'Gender', 'Religion', 'Caste',
              'Class', 'Mobile', 'Address', 'Transport']],
      body: array,
      theme: 'grid'
    })
    if(!isPrint) {
      doc.save("student-list.pdf");
    } else {
      doc.output("pdfobjectnewwindow");
    }
  }

  exportToXlsx(exportData) {
    let rows = exportData.map(row => ({
      STUEDENT_ID : row.studentId,
      GEN_REG_NO : row.genRegNo,
      NAME : row.firstName + " " + row.middleName + " " + row.lastName,
      BIRTH_DATE : this.datePipe.transform(row.birthDate, 'dd-MM-yyyy'),
      ADHAR_NUMBER : row.adharNumber,
      GENDER : row.gender,
      RELIGION : row.religion,
      CASTE : row.caste,
      CLASS : row.classDet.id,
      MOBILE : row.mobileNumber,
      ADDRESS : row.address,
      TRANSPORT : row.transportOpted ? 'Y' : 'N'
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFileXLSX(wb, "Student_List.xlsx");
  }
}
