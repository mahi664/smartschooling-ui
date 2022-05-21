import { Injectable } from '@angular/core';
import { UserAdvanceDetails} from '../user-details/user-details.component';

@Injectable({
  providedIn: 'root'
})
export class UserAdvanceService {

  userAdvanceDetails : UserAdvanceDetails;

  constructor() { }

  public getUserAdvanceDetails(){
    return this.userAdvanceDetails;
  }

  public setUserAdvanceDetails(userAdvanceDetails : UserAdvanceDetails){
    this.userAdvanceDetails = userAdvanceDetails;
  }
}
