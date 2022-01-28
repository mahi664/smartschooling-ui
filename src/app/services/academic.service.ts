import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicDetailsBO } from '../student-list/student-list.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

  constructor(private http : HttpClient, private commonService: CommonService) { }

  getAcademicList() {
    return this.http.get<AcademicDetailsBO[]>(this.commonService.BASE_URL+"/academic/details");
  }

  addNewAcademicDetails(academicYearList: AcademicDetailsBO[]) {
    return this.http.post<AcademicDetailsBO[]>(this.commonService.BASE_URL+"/academic/details", academicYearList);
  }
}
