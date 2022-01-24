import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeeTypesComponent } from './fee-types/fee-types.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {path:"student-list", component: StudentListComponent},
  {path: "student-details/:student", component: StudentDetailsComponent },
  {path: "fee-types", component: FeeTypesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
