import { Component, OnInit } from '@angular/core';
import { AcademicService } from '../services/academic.service';
import { AcademicDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-academic-details',
  templateUrl: './academic-details.component.html',
  styleUrls: ['./academic-details.component.css']
})
export class AcademicDetailsComponent implements OnInit {

  academicYears : AcademicDetailsBO[] = [];
  newAcademicYearDetails : AcademicDetailsBO = new AcademicDetailsBO("","","",null,null);
  dataValidationFlags = {};
  constructor(private academicService : AcademicService) { }

  ngOnInit() {
    this.initDataValidationFlags();
    this.academicService.getAcademicList().subscribe(
      response => {
        this.academicYears = response;
        console.log("Academic Years:");
        console.log(this.academicYears);
      },
      error => {
        console.log("Error while fetching academic years list");
        console.log(error);
      }
    );
  }

  initDataValidationFlags() {
    this.dataValidationFlags["academicYear"] = false;
    this.dataValidationFlags["displayName"] = false;
    this.dataValidationFlags["startDate"] = false;
    this.dataValidationFlags["endDate"] = false;
  }

  handleDataValidationFlag(field: string, value: any) {
    if(value!=undefined && value!="" && value!=null){
      this.dataValidationFlags[field] = false;
    }
  }

  addnewAcademicYearDetails(){
    if(this.isValidatenewAcademicYearDetails()){
      let academicYearList : AcademicDetailsBO[] = [];
      academicYearList.push(this.newAcademicYearDetails);
      this.academicService.addNewAcademicDetails(academicYearList).subscribe(
        response => {
          this.academicYears.push(response[0]);
          alert("New Academic Year added successfully!");
        },
        error => {
          alert("Error in adding new academic year. Please contact system administrator");
          console.log(error);
        }
      );
      this.newAcademicYearDetails = new AcademicDetailsBO("","","",null,null);
    }else{
      alert("Please fill all the required details");
    }
  }

  isValidatenewAcademicYearDetails() {
    let retFlag = true;
    if(this.newAcademicYearDetails.academicYear==="" || this.newAcademicYearDetails.academicYear===undefined){
      this.dataValidationFlags["academicYear"] = true;
      retFlag = false;
    }
    if(this.newAcademicYearDetails.academicStartDate==null){
      this.dataValidationFlags["startDate"] = true;
      retFlag = false;
    }
    if(this.newAcademicYearDetails.academicEndDate==null){
      this.dataValidationFlags["endDate"] = true;
      retFlag = false;
    }
    return retFlag;
  }
}
