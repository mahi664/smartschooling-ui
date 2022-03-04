import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassesDetailsBO, SubjectDetailsBO } from '../student-list/student-list.component';
import { AuthenticationService } from './authentication.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient,private commonService: CommonService, 
    private authService: AuthenticationService) { }

  getClassesNames(){
    return this.http.get<ClassesDetailsBO[]>(this.commonService.BASE_URL+"/Classes");
  }

  addNewClassDetails(newClassDetails: ClassesDetailsBO) {
    return this.http.post<ClassesDetailsBO>(this.commonService.BASE_URL+"/Classes", newClassDetails);
  }

  addClassesDetailsConfig(classId: String, classesSubjectDetails: SubjectDetailsBO[]) {
    return this.http.post<SubjectDetailsBO[]>(`${this.commonService.BASE_URL}/Classes/${classId}/Subjects`,classesSubjectDetails);
  }

  getClassesSubjectConfig(classId: String){
    return this.http.get<SubjectDetailsBO[]>(`${this.commonService.BASE_URL}/Classes/${classId}/Subjects`);
  }
}
