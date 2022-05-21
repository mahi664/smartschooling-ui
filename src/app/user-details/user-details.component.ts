import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAdvanceService } from '../services/user-advance.service';
import { UserBasicDetails } from '../user-list/user-list.component';
import { UserServiceService} from '../services/user-service.service'
import { ManagrDetails } from '../user-manager-details/user-manager-details.component';
import { SalaryDetails } from '../user-salary-details/user-salary-details.component';
import { RoleDetails } from '../new-role/new-role.component';
export class UserAdvanceDetails extends UserBasicDetails{
  constructor(public userAcademicDetails:{}, public userManagerDetails : ManagrDetails[],
    public userSalaryDetails : SalaryDetails[], public userRoles: RoleDetails[]){
    super("","","","","","","",null,"","","","","","","");
  }
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  selectedTab : string;
  userDetailsTabs = {}
  userId : string;
  fullName : string;
  userAdvanceDetails : UserAdvanceDetails = null;

  constructor(private router : Router, private activatedRoute: ActivatedRoute, 
    private userAdvanceService: UserAdvanceService, private userService: UserServiceService) { }

  ngOnInit() {
    
    this.userId = this.activatedRoute.snapshot.params['userId']
    if(this.userId!="" && this.userId!=undefined){
      this.populateUserAdvanceDetails(); 
    }else{
      this.router.navigate(['users']);
    }
    this.populateUserDetailsTabsMap();
  }

  populateUserAdvanceDetails() {
    this.userService.getUserAdvanceDetails(this.userId).subscribe(
      response => {
        console.log(response);
        this.userAdvanceDetails = response;
        this.userAdvanceService.setUserAdvanceDetails(this.userAdvanceDetails);
        this.fullName = this.userAdvanceDetails.firstName + " " + this.userAdvanceDetails.middleName 
                      + " " + this.userAdvanceDetails.lastName;
        this.loadUserDetails('BASIC');
      },
      error => {
        console.log("Error in populating user advance details");
        console.log(error);
      }
    );
  }

  populateUserDetailsTabsMap() {
    this.userDetailsTabs['BASIC'] = 'basic-details';
    this.userDetailsTabs['ACADEMIC'] = 'academic-details';
    this.userDetailsTabs['MANAGER'] = 'manager-details';
    this.userDetailsTabs['SALARY'] = 'salary-details';
    this.userDetailsTabs['ROLE'] = 'role-details';  
  }

  loadUserDetails(userDetailsType : string){
    this.selectedTab = userDetailsType;
    this.router.navigate([this.userDetailsTabs[userDetailsType]], {relativeTo:this.activatedRoute});
  }

}
