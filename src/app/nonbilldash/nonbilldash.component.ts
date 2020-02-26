import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BillService } from '../bill.service';
import { NonbillService } from '../nonbill.service';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);


@Component({
  selector: 'app-nonbilldash',
  templateUrl: './nonbilldash.component.html',
  styleUrls: ['./nonbilldash.component.css']
})
export class NonbilldashComponent implements OnInit {

  nonBillableEmployee: any = [];
  NonBillableEmployeesExpInfo: any = [];
  TechNonBillableEngineers: any = [];
  Paidname: any = [];
  PaidCount: any = 0;
  UnPaidname: any = [];
  UnPaidCount: any = 0;
  paidTechnology: any = [];
  paidTechnologyCount: any = [];
  UnPaidTechnology: any = [];
  UnPaidTechnologyCount = [];

  count: any;
  expi: any;
  expidetails: any;
  details: any;

  constructor(private nonbillableservice: NonbillService) {
    this.getNonBillableEmployeesDetails();
    this.getTechnologyWiseNonBillableEmployeesDetails();
    this.getNonBillableEmpExpDetails();
  }

  highcharts = Highcharts;

  getNonBillableEmpExpDetails() {
    let series = [];
    this.nonbillableservice.getNonBillableEmployeesExpList().subscribe(experinaceList => {
      this.expi = experinaceList.expList;
      this.nonbillableservice.getNonBillableEmployeesExpDetails().subscribe(expiCount => {

        this.count = expiCount.countexpi;
        this.expi.map(yoexp => {
          series.push({
            year: yoexp + ' year',
            y: this.count[yoexp]
          });
        })
        const cart3 = Highcharts.chart('container2', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
          },
          title: {
            text: 'Experience Wise Non Billable Engineers',
            x: +15
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
            data: series,

          }]
        });

      });
    });
  }


  // chart2


  getTechnologyWiseNonBillableEmployeesDetails() {
    let series = [];
    this.nonbillableservice.getNonbillable().subscribe(res => {
   console.log(res, ' res');
      this.details = res.list;

      this.nonbillableservice.getTechnologyNonBillableEmployeesDetails().subscribe(countDeatils => {
   console.log(countDeatils, 'countDeatils');
        this.count = countDeatils.countMap;
         this.details.map(item => {
          //  console.log(item, 'items')
           series.push({
             name: item,
             y: this.count[item]
           });
         })

        // console.log('series' + series[0]);
        const chart = Highcharts.chart('container1', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Technology Wise Non Billable Engineers',
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






  sendName(name) {
    console.log(name);
    // this.nonbillableservice.get
  }



  // chart1

  getNonBillableEmployeesDetails() {
    const UnPiadDetails = [];
    const PiadDetails = [];
    this.nonbillableservice.getPaymentTechnologyCount().subscribe(nonBillableEmployeeDetails => {
      this.nonBillableEmployee = nonBillableEmployeeDetails.countPayment;
      console.log(this.nonBillableEmployee,'this.nonBillableEmployee')
      this.nonBillableEmployee.map(emp => {
          if (emp[0] === 'Paid') {
              this.PaidCount = this.PaidCount + emp[2];
              this.Paidname = emp[0];
              PiadDetails.push({
                  name: emp[1],
                  y: emp[2]
              });
          } else {
              this.UnPaidCount = this.UnPaidCount + emp[2];
              this.UnPaidname = emp[0];
              UnPiadDetails.push({
           name: emp[1],
           y: emp[2]
           });

          }
      });
      console.log(this.nonBillableEmployee, 'this.nonBillableEmployeeDetails');
      const chart = Highcharts.chart('container3', {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Non-Billable Technology Wised Paid and Un-paid Engineers Strength'
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total Percentage Of Employees'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
        },
        series: [
          {
            type: 'pie',
            name: 'Category',
            data: [
              {
                name: this.Paidname,
                y: this.PaidCount,
                color: 'green',
                drilldown: 'Paid'
              },
              {
                name: this.UnPaidname,
                y: this.UnPaidCount,
                drilldown: 'Unpaid'
              }
            ]
          }
        ],
        drilldown: {
          series: [
            {
              name: 'Paid',
              id: 'Paid',
              type: 'column',
              data: PiadDetails,
              point: {
                events: {
                  click: function (e) {
                    const p = e.point.name;
                    // console.log(p);
                    this.sendName(p);
                  }.bind(this)
                }
              }
            },
            {
              name: 'Unpaid',
              id: 'Unpaid',
              type: 'column',
              data: UnPiadDetails,
              point: {
                events: {
                  click: function (e) {
                    const p = e.point.name;
                    console.log(p);
                  }.bind(this)
                }
              }
            },
          ]
        }
      });
    }, err => {
      console.log(err);
    }, () => {
      console.log('Non-Billable employees details got successsfully');
    });
  }


  ngOnInit() {
  }

}
