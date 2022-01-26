import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { StudentListComponent } from './student-list/student-list.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentDetailsComponent } from './student-details/student-details.component'
import { FormsModule } from '@angular/forms';
import { FeeTypesComponent } from './fee-types/fee-types.component';
import { NewFeeTypeComponent } from './new-fee-type/new-fee-type.component';
import { FeeDetailsComponent } from './fee-details/fee-details.component';
import { ClassesComponent } from './classes/classes.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SideNavComponent,
    StudentListComponent,
    StudentDetailsComponent,
    FeeTypesComponent,
    NewFeeTypeComponent,
    FeeDetailsComponent,
    ClassesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
