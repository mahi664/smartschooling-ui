import { Component, OnInit } from '@angular/core';
import { AcademicService } from '../services/academic.service';
import { ClassesService } from '../services/classes.service';
import { StudentService } from '../services/student.service';
import { TransportationService } from '../services/transportation.service';
import { AcademicDetailsBO, ClassesDetailsBO, ErrorDto, RouteDetailsBO, SuccessDto } from '../student-list/student-list.component';

export class StudentRegistration {
  constructor(public genRegNo: string, public bookNo: string, public admissionStd: string, public admissionDate: Date,
    public academicYear: string, public prevSchool: string, public firstName: string, public middleName: string,
    public lastName: string, public birthDate: Date, public gender: string, public adharNumber: string,
    public mobileNumber: string, public email: string, public alternateMobile: string, public address: string,
    public religion: string, public caste: string, public nationality: string, public transportOpted: boolean,
    public route: string) {}
}

export class StudentRegistrationResponse {
  constructor(public success: SuccessDto, public error: ErrorDto){}
}

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {

  student : StudentRegistration = new StudentRegistration("","","",new Date(),"","","","","",new Date(),"Male","","","","","","","","",false,"");
  validationFlags = {};
  routesList: RouteDetailsBO[] = [];
  classesList: ClassesDetailsBO[] = [];
  academicList: AcademicDetailsBO[] = [];

  constructor(private transportationService: TransportationService, private classesService: ClassesService,
              private academicService: AcademicService, private studentService: StudentService) { }

  ngOnInit() {
    this.initValidationFlags();
    this.transportationService.getRoutes().subscribe(
      response => {
        console.log(response);
        this.routesList = response;
      },
      error => {
        console.log(error);
      }
    );
    this.classesService.getClassesNames().subscribe(
      response => {
        this.classesList = response;
        console.log(this.classesList);
      },
      error => {
        console.log(error);
      }
    );
    this.academicService.getAcademicList().subscribe(
      response => {
        this.academicList = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  initValidationFlags(){
    this.validationFlags['firstName'] = false;
    this.validationFlags['lastName'] = false;
    this.validationFlags['birthDate'] = false;
    this.validationFlags['gender'] = false;
    this.validationFlags['religion'] = false;
    this.validationFlags['caste'] = false;
    this.validationFlags['nationality'] = false;
    this.validationFlags['mobileNumber'] = false;
    this.validationFlags['address'] = false;
    this.validationFlags['genRegNo'] = false;
    this.validationFlags['bookNo'] = false;
    this.validationFlags['admissionStd'] = false;
    this.validationFlags['academicYear'] = false;
  }

  validateField(field : string, value : string){
    console.log(field);
    this.validationFlags[field]= (value==="" || value===null) ? true : false;
    if(field==="mobileNumber"){
      this.validationFlags["mobileNumberValidity"] = (value.length==10 && (value.match("[a-zA-Z]")==undefined || value.match("[a-zA-Z]").length==0)) ? false : true;
    }
    if(field === "genRegNo" && this.validationFlags[field] == false){
      this.getStudentDetailsForGenRegNo(value);
    }
  }

  getStudentDetailsForGenRegNo(regNo: string) {
    this.studentService.getStudentDetailsForGenRegNo(regNo).subscribe(
      response => {
        this.student = response.success.data;
        alert("Record Alredy present for Gen Reg No"+regNo);
      },
      error => {
        console.log("No record found for reg no ", regNo);
        this.student = new StudentRegistration("","","",new Date(),"","","","","",new Date(),"Male","","","","","","","","",false,"");
        this.student.genRegNo = regNo;
      }
    )
  }

  handleTransPortOpted(student: StudentRegistration) {
    if (student.transportOpted == false) {
      student.route = "";
    }
  }

  saveDetails(student: StudentRegistration) {
    console.log("Adding new student:");
    console.log(student);
    if (this.validateStudentDetails(student)) {
        this.studentService.addNewStudent(student).subscribe(
          response => {
            alert(response.success.data.studentName + " is added successfully !");
          },
          error => {
            console.log(error);
            alert(error.error.errorCode+":"+error.error.errorMessage);
          }
        );
    }else{
      alert("Please fill all the required details");
    }
  }

  validateStudentDetails(student: StudentRegistration) {
    let retFlag = true;
    if(student.firstName==="" || student.firstName===undefined){
      this.validationFlags["firstName"] = true;
      retFlag = false;
    }
    if(student.lastName==="" || student.lastName===undefined){
      this.validationFlags["lastName"] = true;
      retFlag = false;
    }
    if(student.gender==="" || student.gender===undefined){
      this.validationFlags["gender"] = true;
      retFlag = false;
    }
    if(student.religion==="" || student.religion===undefined){
      this.validationFlags["religion"] = true;
      retFlag = false;
    }
    if(student.caste==="" || student.caste===undefined){
      this.validationFlags["caste"] = true;
      retFlag = false;
    }
    if(student.nationality==="" || student.nationality===undefined){
      this.validationFlags["nationality"] = true;
      retFlag = false;
    }
    if(student.mobileNumber==="" || student.mobileNumber===undefined){
      this.validationFlags["mobileNumber"] = true;
      retFlag = false;
    }else{
      if(student.mobileNumber.length!=10 || (student.mobileNumber.match("[a-zA-Z]")!=undefined && student.mobileNumber.match("[a-zA-Z]").length!=0)){
        this.validationFlags['mobileNumberValidity'] = true;
        retFlag = false;
      }
    }
    if(student.address==="" || student.address===undefined){
      this.validationFlags["address"] = true;
      retFlag = false;
    }
    if(student.transportOpted==true && student.route==""){
      this.validationFlags["routeDetails"] = true;
      retFlag = false;
    }
    if(student.genRegNo === '' || student.genRegNo===null || student.genRegNo===undefined){
      this.validationFlags["genRegNo"] = true;
      retFlag = false;
    }
    if(student.bookNo === '' || student.bookNo===null || student.bookNo===undefined){
      this.validationFlags["bookNo"] = true;
      retFlag = false;
    }
    if(student.admissionStd==="" || student.admissionStd===undefined){
      this.validationFlags["admissionStd"] = true;
      retFlag = false;
    }
    if(student.admissionDate===null || student.admissionDate===undefined){
      this.validationFlags["admissionDate"] = true;
      retFlag = false;
    }
    if(student.academicYear==="" || student.academicYear===undefined){
      this.validationFlags["academicYear"] = true;
      retFlag = false;
    }
    return retFlag;
  }
}
