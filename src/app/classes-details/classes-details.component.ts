import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { ClassesService } from '../services/classes.service';
import { SubjectsService } from '../services/subjects.service';
import { ClassesDetailsBO, SubjectDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-classes-details',
  templateUrl: './classes-details.component.html',
  styleUrls: ['./classes-details.component.css']
})
export class ClassesDetailsComponent implements OnInit {

  classId : String = "-1";
  subjects : SubjectDetailsBO[] = [];
  classesSubjectDetails : SubjectDetailsBO[] = [];
  updateFlag: boolean = false;

  constructor(private route: ActivatedRoute, private subjetService: SubjectsService,
    private classesService: ClassesService) { }

  ngOnInit() {
    this.classId = this.route.snapshot.params['classId'];
    this.subjetService.getSubjectDetails().subscribe(
      response => {
        this.subjects = response;
        console.log(this.subjects);
      },
      error => {
        console.log("Error while fetching subjects details");
        console.log(error);
      }
    );

    this.classesService.getClassesSubjectConfig(this.classId).subscribe(
      response => {
        this.classesSubjectDetails = response;
        console.log(this.classesSubjectDetails);
      },
      error => {
        console.log("Error while fetching classes subjects details");
        console.log(error);
      }
    );
  }

  isSubjectSelected(subject: SubjectDetailsBO){
    let subjectDetailsBO : SubjectDetailsBO = null;
    subjectDetailsBO = this.classesSubjectDetails.filter(classSubject => classSubject.subjectId===subject.subjectId)[0];
    if(subjectDetailsBO===undefined){
      return false;
    }
    return true;
  }

  addRemoveSubjectFromClass(subject: SubjectDetailsBO, subjectAlreadySelected: boolean){
    if(!subjectAlreadySelected){
      console.log("Added new subject to class details");
      console.log(subject);
      this.classesSubjectDetails.push(subject);
      console.log(this.classesSubjectDetails);
    }else{
      console.log("Removed new subject to class details");
      console.log(subject);
      this.classesSubjectDetails = this.classesSubjectDetails.filter(classSubject => classSubject.subjectId!=subject.subjectId);
      console.log(this.classesSubjectDetails);
    }
    this.updateFlag = true;
  }

  saveDetails(){
    if(this.updateFlag){
      this.classesService.addClassesDetailsConfig(this.classId, this.classesSubjectDetails).subscribe(
        response => {
          alert("Configuration saved successfully!");
          console.log(response);
        },
        error => {
          alert("Error in saving configs! Contact System Administrator");
          console.log(error);
        }
      );
      this.updateFlag = false;
    }
  }
}
