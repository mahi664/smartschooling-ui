import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleDetails } from '../new-role/new-role.component';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles : RoleDetails[] = [];
  constructor(private router: Router, private rolesService : RolesService) { }

  ngOnInit() {
    this.rolesService.getRoleDetails().subscribe(
      response => {
        this.roles = response;
        console.log(this.roles);
      },
      error => {
        console.log("Error while Fetching roles", error);
      }
    );
  }

  configureRoleDetails(role: RoleDetails){
    this.router.navigate(['/role/configuration',role.roleId]);
  }

  addNewRole(roleId: string){
    this.router.navigate(['/roles/role', roleId]);
  }
}
