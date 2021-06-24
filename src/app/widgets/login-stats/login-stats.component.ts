import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-login-stats',
  templateUrl: './login-stats.component.html',
  styleUrls: ['./login-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LoginStatsComponent implements OnInit {
  @Input() widget: any;

  constructor(public globals: Globals) { }

  ngOnInit(): void {
  }

  public lineChartLabels: Label[] = ['week 1', 'week 2', 'week 3', 'week 4', 'week 5'];
  public lineChartData: ChartDataSets[] = [
    { data: this.globals.loginAnalytics, label: 'Logins in de app' },
  ];
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: 'rgba(244,151,1, 0)',
      borderColor: 'rgb(244,151,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(244,151,1)',
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
    {
      // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [
        {
          id: 'x-axis-0',
          position: 'bottom',
        },
      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ],
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
            content: 'LineAnno',
          },
        },
      ],
    },
  };

}