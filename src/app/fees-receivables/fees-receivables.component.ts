import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../services/classes.service';
import { StudentService } from '../services/student.service';
import { ClassesDetailsBO, FeeReceivables, FilterDto, StudentDetailsBO } from '../student-list/student-list.component';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

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
  totalItems;
  filterDto: FilterDto = new FilterDto([], [], [], [], "", "", "", "", "");
  feeReceivableStats: FeeReceivableStatsDto = new FeeReceivableStatsDto(0,0,0);

  constructor(private classesService: ClassesService, private studentService: StudentService,
    private router: Router, private datePipe: DatePipe) { }

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
        this.totalItems = response.success.totalItems;
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
    let param = student.studentId+"_"+student.firstName+" "+student.middleName+" "+student.lastName
    +"_"+student.mobileNumber+"_"+student.address;
    this.router.navigate(["/fees-receivable/details", param]);
  }

  exportData(exportTo: string) {
    let exportData: StudentDetailsBO[];
    this.studentService.getFeeReceivableDetails(0, this.totalItems, this.filterDto).subscribe(
      response => {
        if(exportTo === 'PDF' || exportTo === "PRINT") {
          this.exportDataToPdf(response.success.data, 
            exportTo === "PRINT" ? true : false);
        } else if(exportTo === 'XLSX') {
          this.exportToXlsx(response.success.data);
        }
      },
      error => {
        console.log("Error in fetching fees receivables : " + error);
        alert("Error While Fetching Fees Receivables ! Please Contact System Administrator")
      }
    );
    
  }

  exportDataToPdf(exportData, isPrint: boolean) {
    let doc = new jsPDF();
    let array = [];
    for(let i=0; i<exportData.length; i++) {
      let arr = [];
      arr.push(i+1);
      arr.push(exportData[i].genRegNo);
      arr.push(exportData[i].firstName + " "+ exportData[i].middleName + " " + exportData[i].lastName);
      arr.push(exportData[i].mobileNumber);
      arr.push(exportData[i].address);
      arr.push(exportData[i].totalAmnt);
      arr.push(exportData[i].dueAmnt);
      arr.push(exportData[i].paidAmnt);
      array.push(arr);
    }
    autoTable(doc, {
      head: [['#', 'Reg No', 'Name', 'Mobile', 'Address', 'Total Fees', 'Due Amount', 'Paid Amount']],
      body: array,
      theme: 'grid'
    })
    if(!isPrint) {
      doc.save("fees-receivables.pdf");
    } else {
      doc.output("pdfobjectnewwindow");
    }
  }

  exportToXlsx(exportData) {
    let rows = exportData.map(row => ({
      STUEDENT_ID : row.studentId,
      GEN_REG_NO : row.genRegNo,
      NAME : row.firstName + " " + row.middleName + " " + row.lastName,
      MOBILE : row.mobileNumber,
      ADDRESS : row.address,
      TOTAL_AMOUNT: row.totalAmnt,
      DUE_AMOUNT: row.dueAmnt,
      PAID_AMOUNT: row.paidAmnt
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFileXLSX(wb, "Fees_Receivales.xlsx");
  }
}
