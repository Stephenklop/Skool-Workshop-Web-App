import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as faker from 'faker';
import { BaseChartDirective, Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public globals: Globals) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Desktop'], ['Mobile'], 'Tablet'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public user: any = undefined;

  ngOnInit(): void {
    this.generateFakeData();
  }

  selectUser(name: String, email: String) {
    console.log(name)
    console.log(email)
    this.testList.forEach(function (value: any) {
      document.getElementById("userButton" + value.name)!.style.backgroundColor = "#f8f8f8"
      document.getElementById("userButton" + value.name)!.style.color = "#707070"
      document.getElementById("userButton" + value.name)!.style.border = "2px solid #707070"
    });
    try {
      document.getElementById("userButton" + name)!.style.backgroundColor = "#F49700"
      document.getElementById("userButton" + name)!.style.color = "#fff"
      document.getElementById("userButton" + name)!.style.border = "none"

      this.user = { name, email }
    } catch (e) {
      console.log(e)
    }
    console.log(this.user)
  }

  userSelected() {
    console.log("clicked on next")
    if (this.user != undefined) {
      document.getElementById("list")!.style.visibility = "hidden"
    } else {
      console.log("geen user geselecteerd")
    }
  }

  public testList: any = [];

  public lineChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7'];
  public lineChartData: ChartDataSets[] = [
    { data: [0, 1, 4, 2, 3, 1, 2], label: 'Logins in de app' }
  ];
  public lineChartDataOrders: ChartDataSets[] = [
    { data: [3, 2, 3, 1, 1, 0, 2], label: 'Bestellingen vanuit de app' }
  ];
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(244,151,1, 0)',
      borderColor: 'rgb(244,151,1)',
      // pointBackgroundColor: 'rgba(244,151,1, 0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(244,151,1)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        id: 'x-axis-0',
        position: 'bottom',
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  generateFakeData() {
    let id = 1;

    for (let i = 0; i < 30; i++) {
      this.testList.push({
        name: faker.name.firstName() + " " + faker.name.lastName(),
        email: faker.name.firstName() + "" + faker.name.lastName() + "@gmail.com"

      });
      console.log("user " + i + " is gemaakt")
    }
  }
}
