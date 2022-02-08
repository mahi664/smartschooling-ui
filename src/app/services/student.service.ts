import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentFeesTransactionDetailsBO } from '../fees-receivable-details/fees-receivable-details.component';
import { StudentDetailsBO } from '../student-list/student-list.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  academicId2FeesDueDetails ;
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

  updateStudentDetails(student : StudentDetailsBO){
    return this.http.post<StudentDetailsBO>(this.commonService.BASE_URL+"/Students/update", student);
  }

  getStudentReceivables(){
    return this.http.get<StudentDetailsBO[]>(this.commonService.BASE_URL+"/Students/Receivables");
  }

  getStudentFeesDueDetails(studentId : string){
    return this.http.get<{}>(`${this.commonService.BASE_URL}/Students/${studentId}/Fees/Dues`);
  }

  getStudentFeesAssignedList(studentId : string){
    return this.http.get<{}>(`${this.commonService.BASE_URL}/Students/${studentId}/Fees/Assigned`);
  }

  getStudentFeesCollectionTransactions(studentId: string){
    return this.http.get<StudentFeesTransactionDetailsBO[]>(`${this.commonService.BASE_URL}/Students/${studentId}/Fees/Collections`);
  }

  addNewStudentFeesTransaction(studentId: string, studentFeesTransactionDetailsBO: StudentFeesTransactionDetailsBO){
    return this.http.post<StudentFeesTransactionDetailsBO>(`${this.commonService.BASE_URL}/Students/${studentId}/Fees/Collections`, studentFeesTransactionDetailsBO);
  }
}
