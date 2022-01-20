import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteDetailsBO } from '../student-list/student-list.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class TransportationService {

  constructor(private http : HttpClient, private commonService : CommonService) { }

  getRoutes(){
    return this.http.get<RouteDetailsBO[]>(this.commonService.BASE_URL+"/routes");
  }
}
