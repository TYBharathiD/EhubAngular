import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NonbillService {
  stackDetails: any = [];
  urlTech: String = 'http://localhost:8080/employee/getByTech';
  constructor(private http: HttpClient,private router:Router) { }

  getNonbillable() :Observable<any>{
    return this.http.get('http://localhost:8080/employee/employee')
  }

  postNonBillable(data) : Observable<any> {
    return this.http.post<any>('http://localhost:8080/employee/employee',data)
  }
  getNonBillableEmployeesExpList() : Observable<any>{
    return this.http.get('http://localhost:8080/employee/getnonbillexpi')
  }
  getNonBillableEmployeesExpDetails() : Observable<any>{
    return this.http.get('http://localhost:8080/employee/nonBillexpCount')
  }

  getTechnologyNonBillableEmployeesDetails() : Observable <any>{
    return this.http.get('http://localhost:8080/employee/stackCountMap')
  }

  getPaymentTechnologyCount() : Observable <any>{
    return this.http.get('http://localhost:8080/employee/countpayement')
  }

  getTechnology(name) {

    return this.http.get(`${this.urlTech}/${name}`).subscribe(billableStackDetails => {
      // debugger
      this.stackDetails = billableStackDetails['billList'];
      // console.log("hgggggggg",this.stackDetails);
      this.router.navigateByUrl('/billdetails')
    }, err => {
      console.log(err)
    }, () => {
      console.log('Employee details with respect to stack got scccessfully')
    });
  }
  

}
