import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectDetailsBO } from '../student-list/student-list.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(public http : HttpClient, public commonService: CommonService) { }

  getSubjectDetails(){
    return this.http.get<SubjectDetailsBO[]>(this.commonService.BASE_URL+"/Subjects");
  }

  addNewSubjects(subjectList: SubjectDetailsBO[]){
    return this.http.post<SubjectDetailsBO[]>(this.commonService.BASE_URL+"/Subjects", subjectList);
  }
}
