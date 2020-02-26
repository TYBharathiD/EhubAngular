import { Component, OnInit } from '@angular/core';
import { BillService } from '../bill.service';
import { NonbillService } from '../nonbill.service';

@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})
export class EmployeeformComponent implements OnInit {


  constructor(private service : NonbillService) { }

  postEmployeesDetails(form){
    console.log(form.value);
    this.service.postNonBillable(form.value).subscribe(res=>{
      console.log(res, 'from praveen');
      alert("Employee added.")
      form.reset();
    },err=>{
      console.log("Error");
    })
  }
  ngOnInit() {
  }

}
