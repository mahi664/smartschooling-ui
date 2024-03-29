import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicDetailsComponent } from './academic-details/academic-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClassesDetailsComponent } from './classes-details/classes-details.component';
import { ClassesComponent } from './classes/classes.component';
import { FeeDetailsComponent } from './fee-details/fee-details.component';
import { FeeTypesComponent } from './fee-types/fee-types.component';
import { FeesReceivableDetailsComponent } from './fees-receivable-details/fees-receivable-details.component';
import { FeesReceivablesComponent } from './fees-receivables/fees-receivables.component';
import { LeaveTypesComponent } from './leave-types/leave-types.component';
import { LoginComponent } from './login/login.component';
import { NewFeeTypeComponent } from './new-fee-type/new-fee-type.component';
import { NewLeaveTypeComponent } from './new-leave-type/new-leave-type.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { RoleConfigurationComponent } from './role-configuration/role-configuration.component';
import { RolesComponent } from './roles/roles.component';
import { RoutesComponent } from './routes/routes.component';
import { AuthenticationGuard } from './services/authentication.guard';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffRegistrationComponent } from './staff-registration/staff-registration.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentFeesNewPaymentComponent } from './student-fees-new-payment/student-fees-new-payment.component';
import { StudentImportComponent } from './student-import/student-import.component';
import { AcademicDetailsBO, StudentListComponent } from './student-list/student-list.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "admin-dashboard", component: AdminDashboardComponent, canActivate: [AuthenticationGuard]},
  {path:"student-list", component: StudentListComponent, canActivate: [AuthenticationGuard]},
  {path: "student-details/:student", component: StudentDetailsComponent, canActivate: [AuthenticationGuard]},
  {path: "student-registration", component: StudentRegistrationComponent, canActivate: [AuthenticationGuard]},
  {path: "student-import", component: StudentImportComponent, canActivate: [AuthenticationGuard]},
  {path: "fee-types", component: FeeTypesComponent, canActivate: [AuthenticationGuard]},
  {path: "fee-types/new-type/:feeType", component: NewFeeTypeComponent, canActivate: [AuthenticationGuard]},
  {path: "fee-details/:feeType", component: FeeDetailsComponent, canActivate: [AuthenticationGuard]},
  {path: "classes", component: ClassesComponent, canActivate: [AuthenticationGuard]},
  {path: "routes", component: RoutesComponent, canActivate: [AuthenticationGuard]},
  {path: "academic/details", component: AcademicDetailsComponent, canActivate: [AuthenticationGuard]},
  {path: "subjects", component: SubjectDetailsComponent, canActivate: [AuthenticationGuard]},
  {path: "classes/:classId", component: ClassesDetailsComponent, canActivate: [AuthenticationGuard]},
  {path: "fees-receivables", component: FeesReceivablesComponent, canActivate: [AuthenticationGuard]},
  {path: "fees-receivable/details/:studentId", component: FeesReceivableDetailsComponent, canActivate: [AuthenticationGuard]},
  {path: "Fees/Payment/:studentId", component: StudentFeesNewPaymentComponent, canActivate: [AuthenticationGuard]},
  {path: "leave-types/new-type/:leaveId", component: NewLeaveTypeComponent, canActivate: [AuthenticationGuard]},
  {path: "leave-types", component: LeaveTypesComponent, canActivate: [AuthenticationGuard]},
  {path: "roles", component: RolesComponent, canActivate: [AuthenticationGuard]},
  {path: "roles/role/:roleId", component: NewRoleComponent, canActivate: [AuthenticationGuard]},
  {path: "role/configuration/:roleId", component: RoleConfigurationComponent, canActivate: [AuthenticationGuard]},
  {path: "staff-registration", component: StaffRegistrationComponent, canActivate: [AuthenticationGuard]},
  {path: "staff-list", component: StaffListComponent, canActivate: [AuthenticationGuard]}
  // {
  //   path: "users/:userId", component: UserDetailsComponent, canActivate: [AuthenticationGuard],
  //   children : [
  //     // { path: '', redirectTo: 'basic-details', pathMatch: 'full', canActivate: [AuthenticationGuard] },
  //     {path: 'basic-details', component: UserBasicDetailsComponent, canActivate: [AuthenticationGuard]},
  //     {path: 'academic-details', component: UserAcademicDetailsComponent, canActivate: [AuthenticationGuard]},
  //     {path: 'manager-details', component: UserManagerDetailsComponent, canActivate: [AuthenticationGuard]},
  //     {path: 'salary-details', component: UserSalaryDetailsComponent, canActivate: [AuthenticationGuard]},
  //     {path: 'role-details', component: UserRoleDetailsComponent, canActivate: [AuthenticationGuard]}
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
