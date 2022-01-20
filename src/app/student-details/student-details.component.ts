import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';
import { AcademicDetailsBO, ClassesDetailsBO, FeesDetailsBO, RouteDetailsBO, StudentDetailsBO } from '../student-list/student-list.component';
import { DatePipe } from '@angular/common';
import { ClassesService } from '../services/classes.service';
import { TransportationService } from '../services/transportation.service';
import { AcademicService } from '../services/academic.service';
import { FeesService } from '../services/fees.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  providers: [DatePipe]
})
export class StudentDetailsComponent implements OnInit {

  studentId = "";
  student : StudentDetailsBO = null;

  batchNoDropDwns = [];
  batchNos = [];
  filteredBatchNos : string[] = [];
  selectedIndex = -1;
  studentClassDetailsKeys = [];
  studentFeeDetailsKeys = [];
  feeTypes : FeesDetailsBO[] = [];
  routesList : RouteDetailsBO[]=[];
  currentAcademicId = "1";
  newStudentClassDet = {};
  newStudentFeeDet = {};
  academicList : AcademicDetailsBO[] = [];
  classesList : ClassesDetailsBO[] = [];
  constructor(private route: ActivatedRoute, private studentService: StudentService,
    private datePipe: DatePipe, private classesService : ClassesService, private transportationService: TransportationService,
    private academicService : AcademicService, private feesService: FeesService) { }

  ngOnInit() {

    this.feesService.getFeeDetails().subscribe(
      response=>{
        this.feeTypes = response;
      },
      error=>{
        console.log(error);
      }
    );

    this.transportationService.getRoutes().subscribe(
      response => {
        console.log(response);
        this.routesList = response;
      },
      error =>{
        console.log(error);
      }
    );

    this.academicService.getAcademicList().subscribe(
      response =>{
        this.academicList = response;
      },
      error=>{
        console.log(error);
      }
    );

    this.classesService.getClassesNames().subscribe(
      response=>{
        this.classesList = response;
        // console.log(this.classesList);
      },
      error=>{
        console.log(error);
      }
    );

    console.log(this.route.snapshot.params['student']);
    this.studentId = this.route.snapshot.params['student'];

    if(this.studentId==="" || this.studentId==="-1"){
      this.student = new StudentDetailsBO("","","","",new Date(),"","","","Male","","","","",
      new RouteDetailsBO("","","",0),{},{}, false);
      console.log("Adding new student : "+this.student);
    }else{
      this.student = this.studentService.studentList.filter(std => std.studentId===this.studentId)[0];
      console.log("Editing Details : ");
      console.log(this.student)

      for(const key of Object.keys(this.student.studentClassDetails)){
        this.studentClassDetailsKeys.push(key);
      }

      for(const key of Object.keys(this.student.studentFeeDetails)){
        this.studentFeeDetailsKeys.push(key);
      }
    }
  }

  editStudentRoutesDetails(student : StudentDetailsBO){

    student.routeDetailsBO = this.routesList.filter(route=>route.routeId===student.routeDetailsBO.routeId)[0];
    
  }

  addNewAcadeicRecord(student:StudentDetailsBO){
    // console.log("adding new academic record");
    // console.log(this.newStudentClassDet);
    let list = [];
    let classDetailsBO = new ClassesDetailsBO(this.newStudentClassDet["classId"],"");
    list.push(classDetailsBO);
    student.studentClassDetails[this.newStudentClassDet["academicId"]]=list;
    this.studentClassDetailsKeys.push(this.newStudentClassDet["academicId"]);
    // console.log("after adding new acadeic record:");
    // console.log(student);
    this.newStudentClassDet={}
  }

  addNewFeesRecord(student: StudentDetailsBO){
    let academicId = this.newStudentFeeDet["academicId"];
    let feeList = this.newStudentFeeDet["feeList"];
    for(let feeType of feeList){
      if(feeType.feeName==="Tution Fee" || feeType.feeName==="Admission Fee")
        feeType.classId = student.studentClassDetails[academicId][0].classId;
      else if(feeType.feeName==="Transport Fee")
        feeType.routeId = student.routeDetailsBO.routeId;
    }
    
    if(student.studentFeeDetails[academicId]===undefined){
      student.studentFeeDetails[academicId] = feeList;
    }
    else{
      let list = [];
      list = student.studentFeeDetails[academicId]
      for(let feeType of feeList)
        list.push(feeType);
      student.studentFeeDetails[academicId] = list;
    }
    if(!this.studentFeeDetailsKeys.includes(academicId)){
      this.studentFeeDetailsKeys.push(academicId);
    }
    this.newStudentFeeDet={}
  }

  saveDetails(student : StudentDetailsBO){
    console.log("Adding new student:");
    console.log(student);
    this.studentService.addNewStudent(student).subscribe(
      response=>{
        student = response;
        this.studentService.studentList.push(student);
        alert(this.student.studentId+" is added successfully !");
      },
      error=>{
        console.log(error);
      }
    );
  }

  handleTransPortOpted(student : StudentDetailsBO){
    if(student.transportOpted==false){
      student.routeDetailsBO = new RouteDetailsBO("","","",0);
    }
  }

  handleSelectedFeeType(feeType:FeesDetailsBO){
    let list=[];
    if(this.newStudentFeeDet["feeList"]===undefined){
      list=[];
    }else{
      list= this.newStudentFeeDet["feeList"];
    }
    list.push(feeType);
    this.newStudentFeeDet["feeList"] = list;

    console.log(this.newStudentFeeDet);
  }

  getFilteredBatchNoList(inputItem: string) {
    if (inputItem === '')
      this.filteredBatchNos = [];
    else this.filteredBatchNos = this.batchNos.filter((item) => item.toLowerCase().includes(inputItem.toLowerCase()));
  }

  toggleBatchNoListDisplay(sender: number, index: number, product) {

    if (sender === 1) {
      // this.selectedIndex = -1;
      this.batchNoDropDwns[index] = true;
      this.getFilteredBatchNoList(product.std);
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        // this.selectItem(this.selectedIndex);
        // this.listHidden = true;
        product.std = product.std;
        // product.gst = this.prodName2GstMap[product.productName];
        // product.productId = this.prodName2IdMap[product.productName];
        this.batchNoDropDwns[index] = false;
      }, 100);
    }
  }

  // selectBatchNo(batch: string, index: number, product: StudentAcademicDetailsBO) {
  //   this.batchNoDropDwns[index] = false;
  //   product.std = batch;
  // }

  onKeyPressBatchNo(event, index, product) {

    if (this.batchNoDropDwns[index] == true) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleBatchNoListDisplay(0, index, product);
      }

      if (event.key === 'Enter') {

        this.toggleBatchNoListDisplay(0, index, product);
      }
      if (event.key === 'ArrowDown') {

        this.batchNoDropDwns[index] = true;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredBatchNos.length;
        product.std = this.filteredBatchNos[this.selectedIndex];
        if (this.filteredBatchNos.length > 0 && this.batchNoDropDwns[index] == true) {
          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {

        this.batchNoDropDwns[index] = true;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredBatchNos.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredBatchNos.length;
        product.std = this.filteredBatchNos[this.selectedIndex];
        if (this.filteredBatchNos.length > 0 && this.batchNoDropDwns[index] == true) {

          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    }
  }
}
