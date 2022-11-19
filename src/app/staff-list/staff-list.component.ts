import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { StaffService } from '../services/staff.service';
import { StaffBasicDetails } from '../staff-registration/staff-registration.component';
import { FilterDto, SuccessDto } from '../student-list/student-list.component';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {

  page = 0;
  size = 15;
  filterDto: FilterDto = new FilterDto([], [], [], [], "", "", "", "", "");
  totalItems;
  staffListSuccessResponse: SuccessDto;
  pagedStaff: any[] = [];
  pageArray = [];
  currentPage = 1;
  filteredData = {};
  castes: string[] = ['OPEN', 'OBC', 'NT-A', 'NT-B', 'NT-C', 'NT-D', 'SC', 'ST'];

  constructor(private staffService: StaffService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    console.log('getting staff list...');
    this.staffService.getStaffList(this.page, this.size, this.filterDto).subscribe(
      response => {
        this.staffListSuccessResponse = response.success;
        console.log(this.staffListSuccessResponse);
        for (let i = 0; i < this.staffListSuccessResponse.totalPages; i++) {
          this.pageArray.push(i + 1);
        }
        this.currentPage = this.staffListSuccessResponse.currentPage + 1;
        this.pagedStaff = this.staffListSuccessResponse.data;
        this.totalItems = this.staffListSuccessResponse.totalItems;
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
    this.staffService.getStaffList(page - 1, this.size, this.filterDto).subscribe(
      response => {
        this.staffListSuccessResponse = response.success;
        console.log(this.staffListSuccessResponse);
        this.pagedStaff = this.staffListSuccessResponse.data;
        this.currentPage = this.staffListSuccessResponse.currentPage + 1;
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

  applyFilter() {
    console.log("Applying filters");
    this.staffService.getStaffList(this.page, this.size, this.filterDto).subscribe(
      response => {
        this.staffListSuccessResponse = response.success;
        console.log(this.staffListSuccessResponse);
        this.pageArray = [];
        for (let i = 0; i < this.staffListSuccessResponse.totalPages; i++) {
          this.pageArray.push(i + 1);
        }
        this.currentPage = this.staffListSuccessResponse.currentPage + 1;
        this.pagedStaff = this.staffListSuccessResponse.data;
      },
      error => {
        console.log("Error in fetching student list : " + error);
        alert("Error While Fetching Student List ! Please Contact System Administrator")
      }
    );
  }

  clearFilter() {
    this.filterDto = new FilterDto([],[],[],[], "", "", "", "", "");
    this.staffService.getStaffList(this.page, this.size, this.filterDto).subscribe(
      response => {
        this.staffListSuccessResponse = response.success;
        console.log(this.staffListSuccessResponse);
        this.pageArray = [];
        for (let i = 0; i < this.staffListSuccessResponse.totalPages; i++) {
          this.pageArray.push(i + 1);
        }
        this.currentPage = this.staffListSuccessResponse.currentPage + 1;
        this.pagedStaff = this.staffListSuccessResponse.data;
      },
      error => {
        console.log("Error in fetching student list : " + error);
        alert("Error While Fetching Student List ! Please Contact System Administrator")
      }
    );
  }

  printStaffData() {
    const printContent = document.getElementById("printContent");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

  exportData(exportTo: string) {
    let exportData: StaffBasicDetails[];
    this.staffService.getStaffList(0, this.totalItems, this.filterDto).subscribe(
      response => {
        this.staffListSuccessResponse = response.success;
        console.log(this.staffListSuccessResponse);
        if(exportTo === 'PDF' || exportTo === "PRINT") {
          this.exportDataToPdf(this.staffListSuccessResponse.data, 
            exportTo === "PRINT" ? true : false);
        } else if(exportTo === 'XLSX') {
          this.exportToXlsx(this.staffListSuccessResponse.data);
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
      arr.push(exportData[i].firstName + " "+ exportData[i].middleName + " " + exportData[i].lastName);
      arr.push(this.datePipe.transform(exportData[i].birthDate, 'dd-MM-yyyy'));
      arr.push(exportData[i].adharNumber);
      arr.push(exportData[i].gender);
      arr.push(exportData[i].maritalStatus);
      arr.push(exportData[i].religion);
      arr.push(exportData[i].caste);
      arr.push(exportData[i].mobileNumber);
      arr.push(exportData[i].email);
      arr.push(exportData[i].address);
      array.push(arr);
    }
    autoTable(doc, {
      head: [['#', 'Name', 'Birth Date', 'Adhar Number', 'Gender', 'Marital Status', 'Religion', 'Caste',
              'Mobile', 'Email', 'Address']],
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
      ID : row.userId,
      NAME : row.firstName + " " + row.middleName + " " + row.lastName,
      BIRTH_DATE : this.datePipe.transform(row.birthDate, 'dd-MM-yyyy'),
      ADHAR_NUMBER : row.adharNumber,
      GENDER : row.gender,
      MARITAL_STATUS : row.maritalStatus,
      RELIGION : row.religion,
      CASTE : row.caste,
      MOBILE : row.mobileNumber,
      EMAIL : row.email,
      ADDRESS : row.address
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFileXLSX(wb, "Student_List.xlsx");
  }

}
