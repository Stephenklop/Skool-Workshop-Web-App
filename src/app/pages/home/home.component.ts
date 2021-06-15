import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {
  Color,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts';
import { Globals } from 'src/globals';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public router: Router,
    public globals: Globals,
    private api: ApiService
  ) {
    if (this.globals.currentlyLoggedIn) {
      console.log('logged in');
    } else {
      this.router.navigate(['']);
    }
    console.log(sessionStorage.getItem('loggedIn'));
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  public titleChecked: String = '';

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public user: any = undefined;
  public notificationToEveryone: boolean = false;
  public isDisabled: boolean = false;

  ngOnInit(): void {
    // this.generateFakeData();
    console.log(this.globals.loginAnalytics);
    this.globals.notification_used_list = this.globals.notification_test_list;
    console.log(this.globals.notification_used_list)
    document.getElementById(
      'menuWelcomeName'
    )!.textContent = this.globals.user.name;
    document.getElementById(
      'menuAccountName'
    )!.textContent = this.globals.user.username;
    document.getElementById(
      'menuAccountRole'
    )!.textContent = this.globals.user.role;

    this.globals.quiz_list_original.forEach((item: any) => {
      console.log(item);
      if (item.status == true) {
        let radioButton = <HTMLInputElement>(
          document.getElementById('quizRadioButton' + item.url)
        );
        console.log('quizRadioButton' + item.url);
        console.log(item.title);
        console.log(radioButton);
        // radioButton.checked(true)
      }
    })

    document.getElementById("sendToEveryone")!.addEventListener('click', (event) => {
      event.preventDefault();
    })

    this.setSessionsPerDeviceCategoryAnalytics();
  }

  setSessionsPerDeviceCategoryAnalytics() {
    this.pieChartLabels = [['Desktop'], ['Mobile'], 'Tablet'];
    this.pieChartData = [30, 50, 20];
  }

  isChecked(quiz: any) {
    if (quiz.status == true) {
      console.log('test');
      return true;
    } else {
      return false;
    }
  }

  filterList(searchKey: String, testList: any, globals: any) {
    let filteredList: any = [];
    testList.forEach((value: any) => {
      if (value.name.toLowerCase().includes(searchKey.toLowerCase()) || value.email.toLowerCase().includes(searchKey.toLowerCase())) {
        filteredList.push(value);
      }
    });
    globals.notification_used_list = filteredList;
  }

  startFilter() {
    let searchBar = <HTMLInputElement>document.getElementById('search')!;

    const flist = this.filterList;
    const global = this.globals;

    searchBar.addEventListener('keyup', function (event) {
      console.log(event);
      flist(searchBar.value, global.notification_test_list, global);
    });
  }

  public selectedUser: any = {};

  onePersonOnClick(id: number) {
    this.globals.notification_used_list.forEach((value: any) => {
      if (value.id === id) {
        this.selectedUser = value;
        console.log(value)
      }
    })
  }

  switchNotificationEveryone() {
    document.getElementById('switchButtonEveryone')!.classList.remove("active");
    document.getElementById('switchButtonOnePerson')!.classList.add("active");
  }

  switchNotificationOnePerson() {
    document.getElementById('switchButtonEveryone')!.classList.add("active");
    document.getElementById('switchButtonOnePerson')!.classList.remove("active");
  }

  public lineChartLabels: Label[] = ['1', '2', '3', '4', '5'];
  public lineChartData: ChartDataSets[] = [
    { data: this.globals.loginAnalytics, label: 'Logins in de app' },
  ];
  public lineChartDataOpens: ChartDataSets[] = [
    { data: this.globals.appOpenAnalytics, label: 'App geopend' },
  ];
  public lineChartDataOrders: ChartDataSets[] = [
    { data: this.globals.orderAnalytics, label: 'Bestellingen vanuit de app' },
  ];
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: 'rgba(244,151,1, 0)',
      borderColor: 'rgb(244,151,1)',
      // pointBackgroundColor: 'rgba(244,151,1, 0)',
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

  createNewQuiz() {
    const titleInput = <HTMLInputElement>(
      document.getElementById('quizTitleInput')
    );
    const title = titleInput.value;

    const linkInput = <HTMLInputElement>(
      document.getElementById('quizLinkInput')
    );
    const link = linkInput.value;

    if (link != '' && title != '') {
      this.api.createNewQuiz(title, link).subscribe((data: any) => {
        console.log(data);
        titleInput.value = '';
        linkInput.value = '';
        this.api.getAllQuizes().subscribe((data: any) => {
          console.log(data.quiz);
          this.globals.quiz_list_original = data.quiz;
        });
      });
    }
  }

  selectQuiz() {
    console.log(this.titleChecked);
    this.globals.quiz_list_original.forEach((item: any) => {
      if (item.title === this.titleChecked) {
        this.api.setQuizStatus(this.titleChecked, true).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }

  onRadioButtonClicked(title: String) {
    this.titleChecked = title;
  }
}
