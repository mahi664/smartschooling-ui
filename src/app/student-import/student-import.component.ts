import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

export class StudentImportDto{
  constructor(public stduentId: string, public genRegNo: number, public bookNo: number, 
    public admissionStd: string, public admissionDate: Date, public academicYear: string,
    public prevSchool: string, public firstName: string, public middleName: string,
    public lastName: string, public birthDate: Date, public gender: string, public adharNumber: string,
    public mobileNumber: string, public email: string, public alternateMobile: string,
    public address: string, public religion: string, public caste: string, public nationality: string,
    public transportOpted: boolean, public route: string){}
}

@Component({
  selector: 'app-student-import',
  templateUrl: './student-import.component.html',
  styleUrls: ['./student-import.component.css']
})
export class StudentImportComponent implements OnInit {

  file: File;
  showImportedData : boolean = false;
  showErrorMessages: boolean = false;
  importedData : StudentImportDto[] = [];
  errorMessages : string[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  onFileChange(event: any){
    this.file = event.target.files[0];
  }

  uploadFile(){
    console.log(this.file);
    this.studentService.importStudentDetails(this.file).subscribe(
      response => {
        console.log(response);
        this.showImportedData = true;
        this.showErrorMessages = false;
        this.importedData = response.success.data;
      },
      error => {
        console.log(error.error.error.errorMessages);
        this.showErrorMessages = true;
        this.showImportedData = false;
        this.errorMessages = error.error.error.errorMessages;
      }
    );
  }
}
