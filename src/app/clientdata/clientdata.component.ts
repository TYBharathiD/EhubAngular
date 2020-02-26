import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as Highcharts from 'highcharts';
import { ClientService } from '../client.service';
import { BillService } from '../bill.service';
@Component({
  selector: 'app-clientdata',
  templateUrl: './clientdata.component.html',
  styleUrls: ['./clientdata.component.css']
})
export class ClientdataComponent implements OnInit {
  details: any=[];
  count: any;
  stackDeatils: any;
  stack: any;
  countMap: any;
  expDetails: any;
  freshCount: any;
  expCount: any;
  revenuYear: any;
  revenuMap: any;
  empListMap: any;

  constructor(private service : ClientService, private billService: BillService) { 
    
   }
  private chart: am4charts.XYChart;
  dataSource: Object;
  
  highcharts = Highcharts;

  // c1
  getMyChart() {
    let series = [];
     let getmyVal: any = JSON.parse(localStorage.getItem("results"));
     this.stackDeatils = getmyVal.stackUniq;
    let stackMapDeatails: any = JSON.parse(localStorage.getItem("countStack"));
    this.countMap = stackMapDeatails;
    this.count = this.countMap.stackMap;
    this.stackDeatils.map(stackName => {
      series.push({
        name: stackName,
        y: this.count[stackName]
      });
    })
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
    }],
      credits: {
        enabled: false
      },
    });
   
     
  }

  
  ngOnInit() {
    this.getMyChart();
    this.expeChart();
    
  }
  billableExpCount: any = []
  expeChart() {
    let  billableexpCount = [];
    let getYearMap: any = JSON.parse(localStorage.getItem("yearMap"));
  
    this.expDetails = getYearMap.yearList;
    this.freshCount = getYearMap.fretMap;
    this.expCount = getYearMap.expCount;
    this.expDetails.map(item => {
     
      billableexpCount.push({
        year: item,
        Fresher:this.freshCount[item],
        Experience: this.expCount[item]
      });
    })
    let  revenuDetails = [];
    this.billService.getRevenuList().subscribe(revResult => {
     console.log('yearwise revenulits::'+revResult);
     this.revenuYear = revResult.yearList;
     this.revenuMap = revResult.revenuMap;
    
     this.billService.getYearWiseEmpList().subscribe(empList => {
      this.empListMap = empList.empMap;
      console.log(this.empListMap);
     this.revenuYear.map(item => {
       revenuDetails.push({
         "year": item,
         "Number of Employees":this.empListMap[item],
         "Profit": this.revenuMap[item]
       });
     })
    
      am4core.ready(function() {
  
          // Themes begin
          am4core.useTheme(am4themes_animated);
          // Themes end
          
          // Create chart instance
          var chart = am4core.create("chartdiv1", am4charts.XYChart);
          
          // Export
          chart.exporting.menu = new am4core.ExportMenu();
          
          // Data for both series
          var data = revenuDetails;
          
          /* Create axes */
          var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "year";
          categoryAxis.renderer.minGridDistance = 30;
          
          /* Create value axis */
          var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          
          /* Create series */
          var columnSeries = chart.series.push(new am4charts.ColumnSeries());
          columnSeries.name = "Total Employees";
          columnSeries.dataFields.valueY = "Number of Employees";
          columnSeries.dataFields.categoryX = "year";
          
          columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
          columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
          columnSeries.columns.template.propertyFields.stroke = "stroke";
          columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
          columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
          columnSeries.tooltip.label.textAlign = "middle";
          
          var lineSeries = chart.series.push(new am4charts.LineSeries());
          lineSeries.name = "Profit";
          lineSeries.dataFields.valueY = "Profit";
          lineSeries.dataFields.categoryX = "year";
          
          lineSeries.stroke = am4core.color("#fdd400");
          lineSeries.strokeWidth = 3;
          lineSeries.propertyFields.strokeDasharray = "lineDash";
          lineSeries.tooltip.label.textAlign = "middle";
          
          var bullet = lineSeries.bullets.push(new am4charts.Bullet());
          bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
          bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
          var circle = bullet.createChild(am4core.Circle);
          circle.radius = 4;
          circle.fill = am4core.color("#fff");
          circle.strokeWidth = 3;
          
          chart.data = data;
          
          });
        });
        });
        
  

          // chart2

          am4core.ready(function() {
  
              // Themes begin
              am4core.useTheme(am4themes_animated);
              // Themes end
              
               // Create chart instance
               const chart = am4core.create('chartdiv2', am4charts.XYChart);
              
              // Add data
              chart.data = billableexpCount;
              
              // Create axes
              var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
              categoryAxis.dataFields.category = "year";
              categoryAxis.numberFormatter.numberFormat = "#";
              categoryAxis.renderer.inversed = true;
              categoryAxis.renderer.grid.template.location = 0;
              categoryAxis.renderer.cellStartLocation = 0.1;
              categoryAxis.renderer.cellEndLocation = 0.9;
              
              var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
              valueAxis.renderer.opposite = true;
              
              // Create series
              function createSeries(field, name) {
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueX = field;
                series.dataFields.categoryY = "year";
                series.name = name;
                series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
                series.columns.template.height = am4core.percent(100);
                series.sequencedInterpolation = true;
              
                var valueLabel = series.bullets.push(new am4charts.LabelBullet());
                valueLabel.label.text = "{valueX}";
                valueLabel.label.horizontalCenter = "left";
                valueLabel.label.dx = 10;
                valueLabel.label.hideOversized = false;
                valueLabel.label.truncate = false;
              
                var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
                categoryLabel.label.text = "{name}";
                categoryLabel.label.horizontalCenter = "right";
                categoryLabel.label.dx = -10;
                categoryLabel.label.fill = am4core.color("#fff");
                categoryLabel.label.hideOversized = false;
                categoryLabel.label.truncate = false;
              }
              
              createSeries("Fresher", "Fresher");
              createSeries("Experience", "Experience");
              
              });
 
  }
 
}
