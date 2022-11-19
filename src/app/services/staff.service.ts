import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StaffBasicDetails } from '../staff-registration/staff-registration.component';
import { FilterDto, ResponseDto } from '../student-list/student-list.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  public addStaffBasicDetails(staffBasicDetails: StaffBasicDetails) {
    return this.http.post<ResponseDto>(`${this.commonService.BASE_URL}/staff`, staffBasicDetails);
  }

  getStaffList(page, size, filterDto: FilterDto){
    let queyParams = new HttpParams().set('page', page).set('size', size);
    if (filterDto != undefined) {
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
      if(filterDto.maritalStatus){
        queyParams = queyParams.append('maritalStatus', filterDto.maritalStatus);
      }
      if(filterDto.sortOrder){
        queyParams = queyParams.append('sortBy', filterDto.sortOrder);
      }
      if(filterDto.quickSearchText){
        queyParams = queyParams.append('quickSearch', filterDto.quickSearchText);
      }
    } 
    let headers = new HttpHeaders().set("academicYear", "AY-2022-23"); 
    return this.http.get<ResponseDto>(this.commonService.BASE_URL+'/staff', {params: queyParams, headers: headers});
  }

}
