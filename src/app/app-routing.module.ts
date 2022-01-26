import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassesComponent } from './classes/classes.component';
import { FeeDetailsComponent } from './fee-details/fee-details.component';
import { FeeTypesComponent } from './fee-types/fee-types.component';
import { NewFeeTypeComponent } from './new-fee-type/new-fee-type.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {path:"student-list", component: StudentListComponent},
  {path: "student-details/:student", component: StudentDetailsComponent },
  {path: "fee-types", component: FeeTypesComponent},
  {path: "fee-types/new-type/:feeType", component: NewFeeTypeComponent},
  {path: "fee-details/:feeType", component: FeeDetailsComponent},
  {path: "classes", component: ClassesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
