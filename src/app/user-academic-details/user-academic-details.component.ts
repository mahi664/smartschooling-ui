import { Component, OnInit } from '@angular/core';
import { UserAdvanceService } from '../services/user-advance.service';
import { ClassesDetailsBO, SubjectDetailsBO } from '../student-list/student-list.component';

@Component({
  selector: 'app-user-academic-details',
  templateUrl: './user-academic-details.component.html',
  styleUrls: ['./user-academic-details.component.css']
})
export class UserAcademicDetailsComponent implements OnInit {

  userAcademicDetails = {};
  academicYearKeys : string[] = [];
  classIdKeys : string[] = [];

  constructor(private userAcademicService: UserAdvanceService) { }

  ngOnInit() {
    // this.populateDummyData();
    this.userAcademicDetails = this.userAcademicService.getUserAdvanceDetails().userAcademicDetails;
    for(const key of Object.keys(this.userAcademicDetails)){
      this.academicYearKeys.push(key);
      for(const classId of Object.keys(this.userAcademicDetails[key])){
        this.classIdKeys.push(classId);
      }
    }
    console.log(this.userAcademicDetails);
    console.log(this.academicYearKeys);
    console.log(this.classIdKeys);
  }
  populateDummyData() {
    let classList : ClassesDetailsBO[] = [];
    let subjectList : SubjectDetailsBO[] = [];
    subjectList.push(new SubjectDetailsBO('ENG','English'));
    subjectList.push(new SubjectDetailsBO('MAR','Marathi'));
    subjectList.push(new SubjectDetailsBO('MATHS','Mathematics'));
    classList.push(new ClassesDetailsBO("1st", "First Std", subjectList));
    classList.push(new ClassesDetailsBO("2nd", "Second Std", subjectList)); 
    this.userAcademicDetails['AY-2020-21'] = classList;
    this.userAcademicDetails['AY-2021-22'] = classList;
  }

}
