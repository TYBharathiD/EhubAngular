import { Component, OnInit } from '@angular/core';
import { NonbillService } from '../nonbill.service';

@Component({
  selector: 'app-empdetails',
  templateUrl: './empdetails.component.html',
  styleUrls: ['./empdetails.component.css']
})
export class EmpdetailsComponent implements OnInit {

  constructor(private empservice:NonbillService) {
    this.grtEmpData();
   }
   employees:any;
  grtEmpData(){
    this.empservice.getAllEmps().subscribe(res=>{
      this.employees=res;
      console.log(this.employees,'employees');
      this.employees=res['empList'];
    })
  }
    
  ngOnInit() {
  }

}
