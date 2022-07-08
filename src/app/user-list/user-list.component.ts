import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

export class UserBasicDetails {
  constructor(public userId: string, public firstName: string, public middleName: string, public lastName: string,
    public mobile: string, public email: string, public address: string, public birthDate: Date, 
    public maritalStatus: string, public adhar: string, public religion: string, public caste: string,
    public nationality: string, public gender: string, public alternateMobile: string) {}
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList : UserBasicDetails[] = [];
  userListOrg : UserBasicDetails[] = [];
  currentAcademicId : string = "AY-2021-22";
  isFilterExpanded = false;
  filteredData = {};

  constructor(private userService: UserServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      response => {
        this.userList = response;
        this.userListOrg = response;
        console.log(this.userList); 
      }
    );
  }

  filterUsersOnQuickSearch(){
    console.log("Filtering Users on address change");
    if(this.filteredData['quickSearch']===undefined || this.filteredData['quickSearch']===""){
      this.userList = this.userListOrg;
    }
    else if(this.filteredData['quickSearch']!=undefined){
      console.log("Filtering based on : ", this.filteredData['quickSearch'].toLowerCase());
      this.userList = this.userListOrg.filter(
        user => (user.address.toLowerCase().includes(this.filteredData['quickSearch'].toLowerCase()) ||
          user.firstName.toLowerCase().includes(this.filteredData['quickSearch'].toLowerCase()) ||
          user.middleName.toLowerCase().includes(this.filteredData['quickSearch'].toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.filteredData['quickSearch'].toLowerCase()))
      );
    }
  }

  addNewUser(){
    this.router.navigate(["new-user"]);
  }

  editUserDetails(user : UserBasicDetails){
    this.router.navigate(['users', user.userId]);
  }
}
