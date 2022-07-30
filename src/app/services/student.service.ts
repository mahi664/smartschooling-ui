import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentFeesTransactionDetailsBO } from '../fees-receivable-details/fees-receivable-details.component';
import { FilterDto, ResponseDto, StudentDetailsBO } from '../student-list/student-list.component';
import { StudentRegistration, StudentRegistrationResponse } from '../student-registration/student-registration.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  academicId2FeesDueDetails ;
  constructor(private http: HttpClient, private commonService: CommonService) { }

  studentList : StudentDetailsBO[] = [];
  getStudentsList(page, size, filterDto: FilterDto){
    let queyParams = new HttpParams().set('page', page).set('size', size);
    if (filterDto != undefined) {
      if (filterDto.classIds) {
        Object.keys(filterDto.classIds).filter(classId => filterDto.classIds[classId])
          .forEach(classId => queyParams = queyParams.append('classId', classId));
      }
      if (filterDto.routeIds) {
        Object.keys(filterDto.routeIds).filter(routeId => filterDto.routeIds[routeId])
          .forEach(routeId => queyParams = queyParams.append('route', routeId));
      }
      if (filterDto.castes) {
        Object.keys(filterDto.castes).filter(caste => filterDto.castes[caste])
          .forEach(caste => queyParams = queyParams.append('caste', caste));
      }
      if (filterDto.religions) {
        Object.keys(filterDto.religions).filter(religion => filterDto.religions[religion])
          .forEach(religion => queyParams = queyParams.append('religion', religion));
      }
      if(filterDto.gender){
        queyParams = queyParams.append('gender', filterDto.gender);
      }
      if(filterDto.transportOpted){
        queyParams = queyParams.append('transportOpted', filterDto.transportOpted === 'Yes' ? 'true' : 'false');
      }
      if(filterDto.sortOrder){
        queyParams = queyParams.append('sortBy', filterDto.sortOrder);
      }
      if(filterDto.quickSearchText){
        queyParams = queyParams.append('quickSearch', filterDto.quickSearchText);
      }
    } 
    let headers = new HttpHeaders().set("academicYear", "AY-2022-23"); 
    return this.http.get<ResponseDto>(this.commonService.BASE_URL+'/students', {params: queyParams, headers: headers});
  }

  getStudentDetails(studentQueryParam: String){
    return this.http.post<StudentDetailsBO>(this.commonService.BASE_URL+'/get-student-details', studentQueryParam);
  }

  getStudentDetailsForGenRegNo(regNo: string) {
    return this.http.get<ResponseDto>(`${this.commonService.BASE_URL}/students/general-register/${regNo}`);
  }

  updateAcademicDetails(studentDetailsBO: StudentDetailsBO){
    return this.http.post(this.commonService.BASE_URL+"/update-academic-details",studentDetailsBO,{responseType:'text'});
  }

  addNewStudent(student: StudentRegistration) {
    return this.http.post<ResponseDto>(this.commonService.BASE_URL+"/students",student);
  }

  importStudentDetails(file: File){
    let formData = new FormData();
    formData.append("file", file);
    return this.http.post<ResponseDto>(`${this.commonService.BASE_URL}/students/import`, formData);
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
