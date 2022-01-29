import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';
import { AcademicDetailsBO, ClassesDetailsBO, FeesDetailsBO, RouteDetailsBO, StudentDetailsBO } from '../student-list/student-list.component';
import { DatePipe } from '@angular/common';
import { ClassesService } from '../services/classes.service';
import { TransportationService } from '../services/transportation.service';
import { AcademicService } from '../services/academic.service';
import { FeesService } from '../services/fees.service';

// export class DataValidationFlags {
//   firstName : boolean;
//   lastName : boolean;
//   birthDate : boolean;
//   gender : boolean;
//   religion : boolean;
//   caste : boolean;
//   nationality : boolean;
//   mobileNumber : boolean;
//   address : boolean;
//   mobileNumberValidity : boolean;
//   routeDetails : boolean;
//   constructor() {
//     this.firstName = false;
//     this.lastName = false;
//     this.birthDate = false;
//     this.gender = false;
//     this.religion = false;
//     this.caste = false;
//     this.nationality = false;
//     this.mobileNumber = false;
//     this.address = false;
//     this.mobileNumberValidity = false;
//     this.routeDetails = false;
//   }
// }

// export class NewStudentClassDetails {
  
//   academicId : string;
//   classId : string;
//   result : string;
//   grade : string;
//   constructor() {
//     this.academicId = "";
//     this.classId = "";
//     this.result = "";
//     this.grade = "";
//   }
// }

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  providers: [DatePipe]
})
export class StudentDetailsComponent implements OnInit {

  studentId = "";
  student: StudentDetailsBO = null;

  batchNoDropDwns = [];
  batchNos = [];
  filteredBatchNos: string[] = [];
  selectedIndex = -1;
  studentClassDetailsKeys = [];
  studentFeeDetailsKeys = [];
  feeTypes: FeesDetailsBO[] = [];
  routesList: RouteDetailsBO[] = [];
  currentAcademicId = "1";
  newStudentClassDet = {};
  newStudentFeeDet = {};
  academicList: AcademicDetailsBO[] = [];
  classesList: ClassesDetailsBO[] = [];
  validationFlags = {};

  constructor(private route: ActivatedRoute, private studentService: StudentService,
    private datePipe: DatePipe, private classesService: ClassesService, private transportationService: TransportationService,
    private academicService: AcademicService, private feesService: FeesService) { }

  ngOnInit() {

    this.feesService.getFeeTypes().subscribe(
      response => {
        this.feeTypes = response;
      },
      error => {
        console.log(error);
      }
    );

    this.transportationService.getRoutes().subscribe(
      response => {
        console.log(response);
        this.routesList = response;
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

    this.classesService.getClassesNames().subscribe(
      response => {
        this.classesList = response;
        // console.log(this.classesList);
      },
      error => {
        console.log(error);
      }
    );

    console.log(this.route.snapshot.params['student']);
    this.studentId = this.route.snapshot.params['student'];

    this.initValidationFlags();

    if (this.studentId === "" || this.studentId === "-1") {
      this.student = new StudentDetailsBO("", "", "", "", new Date(), "", "", "", "Male", "", "" ,"", "", "",
        new RouteDetailsBO("", "", "", 0), {}, {}, false);
      console.log("Adding new student : " + this.student);
    } else {
      this.student = this.studentService.studentList.filter(std => std.studentId === this.studentId)[0];
      console.log("Editing Details : ");
      console.log(this.student)

      for (const key of Object.keys(this.student.studentClassDetails)) {
        this.studentClassDetailsKeys.push(key);
      }

      for (const key of Object.keys(this.student.studentFeeDetails)) {
        this.studentFeeDetailsKeys.push(key);
      }
    }
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

  }

  editStudentRoutesDetails(student: StudentDetailsBO) {

    student.routeDetailsBO = this.routesList.filter(route => route.routeId === student.routeDetailsBO.routeId)[0];
    if(student.routeDetailsBO.routeId!=""){
      this.validationFlags["routeDetails"]=false;
    }
  }

  addNewAcadeicRecord(student: StudentDetailsBO) {
    if (this.validateNewClassDetRec()) {
      let list = [];
      let classDetailsBO = new ClassesDetailsBO(this.newStudentClassDet["classId"], "",[]);
      list.push(classDetailsBO);
      student.studentClassDetails[this.newStudentClassDet["academicId"]] = list;
      this.studentClassDetailsKeys.push(this.newStudentClassDet["academicId"]);
      this.newStudentClassDet = {};
    }
  }

  validateNewClassDetRec() {
    if (this.newStudentClassDet === undefined) {
      alert("Can not add Empty Academic record. Please fill the required details");
      return false;
    } else if (this.newStudentClassDet["academicId"] === undefined || this.newStudentClassDet["academicId"] === " ") {
      alert("Academic Id Can not be emplty to add new Academic record. Please try again!");
      return false;
    } else if (this.newStudentClassDet["classId"] === undefined || this.newStudentClassDet["classId"] === " ") {
      alert("Please select class to add new fee record. Please try again!");
      return false;
    }
    return true;
  }

  addNewFeesRecord(student: StudentDetailsBO) {
    if (this.validateNewFeesDetRec()) {
      let academicId = this.newStudentFeeDet["academicId"];
      let feeList = this.newStudentFeeDet["feeList"];
      for (let feeType of feeList) {
        if (feeType.feeName === "Tution Fee" || feeType.feeName === "Admission Fee")
          feeType.classId = student.studentClassDetails[academicId][0].classId;
        else if (feeType.feeName === "Transport Fee")
          feeType.routeId = student.routeDetailsBO.routeId;
      }

      if (student.studentFeeDetails[academicId] === undefined) {
        student.studentFeeDetails[academicId] = feeList;
      }
      else {
        let list = [];
        list = student.studentFeeDetails[academicId]
        for (let feeType of feeList)
          list.push(feeType);
        student.studentFeeDetails[academicId] = list;
      }
      if (!this.studentFeeDetailsKeys.includes(academicId)) {
        this.studentFeeDetailsKeys.push(academicId);
      }
      this.newStudentFeeDet = {}
    }
  }

  validateNewFeesDetRec() {
    if (this.newStudentFeeDet === undefined) {
      alert("Can not add Empty fee record. Please fill the required details");
      return false;
    } else if (this.newStudentFeeDet["academicId"] === undefined || this.newStudentFeeDet["academicId"] === " ") {
      alert("Academic Id Can not be emplty to add new fee record. Please try again!");
      return false;
    } else if (this.newStudentFeeDet["feeList"] === undefined || this.newStudentFeeDet["feeList"].length == 0) {
      alert("Please select atleast one fee type to add new fee record. Please try again!");
      return false;
    }
    return true;
  }

  saveDetails(student: StudentDetailsBO) {
    console.log("Adding new student:");
    console.log(student);
    if (this.validateStudentDetails(student)) {
      this.studentService.addNewStudent(student).subscribe(
        response => {
          student = response;
          this.studentService.studentList.push(student);
          alert(this.student.studentId + " is added successfully !");
        },
        error => {
          console.log(error);
          alert("Error while adding new student. Please contact Administrator")
        }
      );
    }else{
      alert("Please fill all the required details");
    }
  }

  validateStudentDetails(student: StudentDetailsBO) {
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
    if(student.transportOpted==true && student.routeDetailsBO.routeId==""){
      this.validationFlags["routeDetails"] = true;
      retFlag = false;
    }
    return retFlag;
  }

  handleTransPortOpted(student: StudentDetailsBO) {
    if (student.transportOpted == false) {
      student.routeDetailsBO = new RouteDetailsBO("", "", "", 0);
    }
  }

  handleSelectedFeeType(feeType: FeesDetailsBO) {
    let list = [];
    if (this.newStudentFeeDet["feeList"] === undefined) {
      list = [];
    } else {
      list = this.newStudentFeeDet["feeList"];
    }
    list.push(feeType);
    this.newStudentFeeDet["feeList"] = list;

    console.log(this.newStudentFeeDet);
  }

  validateField(field : string, value : string){
    this.validationFlags[field]= value==="" ? true : false;
    if(field==="mobileNumber"){
      this.validationFlags["mobileNumberValidity"] = (value.length==10 && (value.match("[a-zA-Z]")==undefined || value.match("[a-zA-Z]").length==0)) ? false : true;
    }
  }
}
