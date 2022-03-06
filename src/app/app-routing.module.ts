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
import { RoutesComponent } from './routes/routes.component';
import { AuthenticationGuard } from './services/authentication.guard';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentFeesNewPaymentComponent } from './student-fees-new-payment/student-fees-new-payment.component';
import { AcademicDetailsBO, StudentListComponent } from './student-list/student-list.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "admin-dashboard", component: AdminDashboardComponent, canActivate: [AuthenticationGuard]},
  {path:"student-list", component: StudentListComponent, canActivate: [AuthenticationGuard]},
  {path: "student-details/:student", component: StudentDetailsComponent, canActivate: [AuthenticationGuard]},
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
  {path: "leave-types", component: LeaveTypesComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
