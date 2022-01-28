import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../services/subjects.service';
import { SubjectDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {

  subjects : SubjectDetailsBO[] = [];
  newSubjectDetails : SubjectDetailsBO = new SubjectDetailsBO("","");
  dataValidationFlags={};
  constructor(public subjectService: SubjectsService) { }

  ngOnInit() {
    this.initDataValidationFlags();
    this.subjectService.getSubjectDetails().subscribe(
      response => {
        this.subjects = response;
        console.log(this.subjects);
      },
      error => {
        console.log("Error in fetching subjects list");
        console.log(error);
      }
    );
  }

  initDataValidationFlags() {
    this.dataValidationFlags["source"] = false;
    this.dataValidationFlags["destination"] = false;
    this.dataValidationFlags["distance"] = false;
  }

  handleDataValidationFlag(field: string, value: any) {
    if(value!=undefined && value!=""){
      this.dataValidationFlags[field] = false;
    }
  }

  addNewSubjectDetails(){
    if(this.isValidatenewSubjectDetails()){
      let subjectList : SubjectDetailsBO[] = [];
      subjectList.push(this.newSubjectDetails);
      this.subjectService.addNewSubjects(subjectList).subscribe(
        response => {
          this.subjects.push(response[0]);
          alert("New Subject added successfully!");
        },
        error => {
          alert("Error in adding new route. Please contact system administrator");
          console.log(error);
        }
      );
      this.newSubjectDetails = new SubjectDetailsBO("","");
    }else{
      alert("Please fill all the required details");
    }
  }

  isValidatenewSubjectDetails() {
    let retFlag = true;
    if(this.newSubjectDetails.subjectId==="" || this.newSubjectDetails.subjectId===undefined){
      this.dataValidationFlags["subjectId"] = true;
      retFlag = false;
    }
    if(this.newSubjectDetails.subjectName==="" || this.newSubjectDetails.subjectName===undefined){
      this.dataValidationFlags["subjectName"] = true;
      retFlag = false;
    }
    return retFlag;
  }

}
