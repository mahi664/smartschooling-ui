import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../services/classes.service';
import { ClassesDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  constructor(private classesService : ClassesService) { }

  classes : ClassesDetailsBO[] = [];
  newClassDetails : ClassesDetailsBO = new ClassesDetailsBO("","");
  dataValidationFlags = {};
  ngOnInit() {
    this.initDataValidationFlags();

    this.classesService.getClassesNames().subscribe(
      response => {
        console.log(response);
        this.classes = response;
      },
      error => {
        console.log("Error in fetching classes list");
        console.log(error);
      }
    );
  }

  initDataValidationFlags() {
    this.dataValidationFlags["classId"] = false;
    this.dataValidationFlags["className"] = false;
  }

  addNewClassDetails(){
    if(this.validateNewFeeDetails()){
      this.classes.push(this.newClassDetails);
      this.classesService.addNewClassDetails(this.newClassDetails).subscribe(
        response => {
          alert("New Class Details Added successfully");
          console.log(response);
        },
        error => {
          console.log("Error in adding new class details");
          console.log(error);
        }
      );
      this.newClassDetails = new ClassesDetailsBO("","");
    }else{
      alert("Please fill all the required details");
    }
  }

  validateNewFeeDetails() {
    let retFlag = true;
    if(this.newClassDetails.classId==="" || this.newClassDetails.classId===undefined){
      this.dataValidationFlags["classId"] = true;
      retFlag = false;
    }
    if(this.newClassDetails.className==="" || this.newClassDetails.className===undefined){
      this.dataValidationFlags["className"] = true;
      retFlag = false;
    }
    return retFlag;
  }

  handleDataValidationFlag(field: string, value: any) {
    if(value!=undefined && value!=""){
      this.dataValidationFlags[field] = false;
    }
  }

}
