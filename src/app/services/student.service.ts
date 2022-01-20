import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentDetailsBO } from '../student-list/student-list.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  studentList : StudentDetailsBO[] = [];
  getStudentsList(){
    return this.http.get<StudentDetailsBO[]>(this.commonService.BASE_URL+'/Students');
  }

  getStudentDetails(studentQueryParam: String){
    return this.http.post<StudentDetailsBO>(this.commonService.BASE_URL+'/get-student-details', studentQueryParam);
  }

  updateAcademicDetails(studentDetailsBO: StudentDetailsBO){
    return this.http.post(this.commonService.BASE_URL+"/update-academic-details",studentDetailsBO,{responseType:'text'});
  }

  addNewStudent(student: StudentDetailsBO) {
    return this.http.post<StudentDetailsBO>(this.commonService.BASE_URL+"/Students",student);
  }
}
