import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleDetails } from '../new-role/new-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles : RoleDetails[] = [new RoleDetails("1","Admin","Admin")];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  configureRoleDetails(role: RoleDetails){
    this.router.navigate(['/role/configuration',role.roleId]);
  }
}
