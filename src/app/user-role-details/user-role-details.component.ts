import { Component, OnInit } from '@angular/core';
import { RoleDetails } from '../new-role/new-role.component';
import { UserAdvanceService } from '../services/user-advance.service';

@Component({
  selector: 'app-user-role-details',
  templateUrl: './user-role-details.component.html',
  styleUrls: ['./user-role-details.component.css']
})
export class UserRoleDetailsComponent implements OnInit {

  userRolesDetails: RoleDetails[];
  constructor(private userAdvanceService: UserAdvanceService) { }

  ngOnInit() {
    this.userRolesDetails = this.userAdvanceService.getUserAdvanceDetails().userRoles;
  }

}
