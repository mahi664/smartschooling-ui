import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicDetailsComponent } from './academic-details/academic-details.component';
import { ClassesDetailsComponent } from './classes-details/classes-details.component';
import { ClassesComponent } from './classes/classes.component';
import { FeeDetailsComponent } from './fee-details/fee-details.component';
import { FeeTypesComponent } from './fee-types/fee-types.component';
import { FeesReceivableDetailsComponent } from './fees-receivable-details/fees-receivable-details.component';
import { FeesReceivablesComponent } from './fees-receivables/fees-receivables.component';
import { NewFeeTypeComponent } from './new-fee-type/new-fee-type.component';
import { RoutesComponent } from './routes/routes.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentFeesNewPaymentComponent } from './student-fees-new-payment/student-fees-new-payment.component';
import { AcademicDetailsBO, StudentListComponent } from './student-list/student-list.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';

const routes: Routes = [
  {path:"student-list", component: StudentListComponent},
  {path: "student-details/:student", component: StudentDetailsComponent },
  {path: "fee-types", component: FeeTypesComponent},
  {path: "fee-types/new-type/:feeType", component: NewFeeTypeComponent},
  {path: "fee-details/:feeType", component: FeeDetailsComponent},
  {path: "classes", component: ClassesComponent},
  {path: "routes", component: RoutesComponent},
  {path: "academic/details", component: AcademicDetailsComponent},
  {path: "subjects", component: SubjectDetailsComponent},
  {path: "classes/:classId", component: ClassesDetailsComponent},
  {path: "fees-receivables", component: FeesReceivablesComponent},
  {path: "fees-receivable/details/:studentId", component: FeesReceivableDetailsComponent},
  {path: "Fees/Payment/:studentId", component: StudentFeesNewPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
