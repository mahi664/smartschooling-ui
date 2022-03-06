import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveDetails } from '../new-leave-type/new-leave-type.component';

@Component({
  selector: 'app-leave-types',
  templateUrl: './leave-types.component.html',
  styleUrls: ['./leave-types.component.css']
})
export class LeaveTypesComponent implements OnInit {

  leaveTypes : LeaveDetails[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addNewLeaveType(leaveId: string){
    this.router.navigate(["/leave-types/new-type", leaveId]);
  }

  editLeaveType(leaveId: string){
    this.addNewLeaveType(leaveId);
  }
}
