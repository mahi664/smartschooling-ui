import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassesDetailsBO } from '../student-list/student-list.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient,private commonService: CommonService) { }

  getClassesNames(){
    return this.http.get<ClassesDetailsBO[]>(this.commonService.BASE_URL+"/Classes");
  }
}
