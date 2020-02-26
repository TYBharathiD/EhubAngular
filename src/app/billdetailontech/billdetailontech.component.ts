import { Component, OnInit } from '@angular/core';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-billdetailontech',
  templateUrl: './billdetailontech.component.html',
  styleUrls: ['./billdetailontech.component.css']
})
export class BilldetailontechComponent implements OnInit {

  constructor(private service : BillService) {
    // this.getTechData();
   }

  // getTechData(){
  //   this.service.getTechnology(name).subscribe(res=>{
  //     console.log(res,'resTechno')
  //   })
  // }
  ngOnInit() {
  }

}
