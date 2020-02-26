import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BillService } from '../bill.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-billdashboard',
  templateUrl: './billdashboard.component.html',
  styleUrls: ['./billdashboard.component.css']
})
export class BilldashboardComponent implements OnInit {
  count: any;
  expi: any;
  expidetails: any;

  constructor(private billservice: BillService,private service : ClientService) { 
    this.getBillDetails();
    this.getExpChart();
    
  }


getExpChart(){
  let series = [];
this.billservice.getExpList().subscribe(experinaceList=>{
//  console.log(experinaceList, 'billdash')
  this.expi=experinaceList.expList;
  this.billservice.getExpiCount().subscribe(expiCount=>{
 
    this.count=expiCount.countexpi;
  this.expi.map(yoexp => {
  
    series.push({
      year: yoexp+' year',
      y: this.count[yoexp]
    });
  })
 const cart3 =  Highcharts.chart('container2' ,{
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: 'Experience Wise  Billable Engineers',
      x:+15
    },
    tooltip: {
          pointFormat: '{series.data.year} {point.year}: {series.name}: <b>{point.y:.0f}</b>'
        },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.year}</b> ({point.y:,.0f}) ',
          style: {
            fontWeight: 'bold',
            color: 'black'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '150%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Number of Employees',
      innerSize: '50%',
     data:series,
     
    }]
    });  
});
});
}


sendStackName(stackName) {
  // console.log(stackName);
  this.billservice.getTechnology(stackName);
}


  highcharts = Highcharts;
  
  // c1
details : any =[]
  getBillDetails() {
    
    let series = [];
    this.billservice.getBills().subscribe(BillableEmployeesDetails => {
      this.details = BillableEmployeesDetails.listBill;
      // console.log( this.details, ' BillableEmployeesDetails')
    
       this.billservice.getStackCount().subscribe(countDeatils =>{
       
        this.count = countDeatils.countMap;
        // console.log( this.count, ' BillableEmployeesDetails count map')

       this.details.map(item => {
         series.push({
           name: item,
           y: this.count[item]
         });
       })
  
      //  console.log('series' + series[0]);
       const chart =  Highcharts.chart('container1' , {
         chart: {
           plotBackgroundColor: null,
           plotBorderWidth: null,
           plotShadow: false,
           type: 'pie'
         },
         title: {
           text: 'Technology Wise Billable Engineers',
           x: +20
         },
         legend: {
           shadow: false
         },
         tooltip: {
           pointFormat: '<b>{point.y}</b>'
         },
         plotOptions: {
           pie: {
             allowPointSelect: true,
             // grouping: false,
             shadow: false,
             cursor: 'pointer',
             dataLabels: {
               enabled: false
             },
             showInLegend: true
           }
         },
         series: [{
           type: 'pie',
           data: series,
           point:{
             events:{
               click: function(e) {
                const stackName = e.point.name
                this.sendStackName(stackName);
               }.bind(this)
             }
           }
       }],
         credits: {
           enabled: false
         },
       });
 
     }, err => {
       console.log(err);
     }, () => {
       console.log('Details Came into DashBoard');
     });
    })
   }    
  
  ngOnInit() {
  }

}
