import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as faker from 'faker';
import {
  Color,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  MultiDataSet,
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
    console.log(this.globals.notification_test_list);
    this.globals.notification_used_list = this.globals.notification_test_list;
    document.getElementById(
      'menuWelcomeName'
    )!.textContent = this.globals.user.name;
    document.getElementById(
      'menuAccountName'
    )!.textContent = this.globals.user.username;
    document.getElementById(
      'menuAccountRole'
    )!.textContent = this.globals.user.role;
    document
      .getElementById('send')!
      .addEventListener('click', function (event) {
        event.preventDefault();
      });

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
    this.api.getSessionsPerDeviceCategoryAnalytics().subscribe((data: any) => {
      const PieChartLabels: Label[] = [];
      console.log(data)

      data.forEach((sessionItem: any) => {
        let count = 0;
        sessionItem.dimensionValues.forEach((dimensionItem: any) => {
          PieChartLabels[count] = dimensionItem.value;
          count++;
        });
      });
      console.log(PieChartLabels)
      this.pieChartLabels = [['Desktop'], ['Mobile'], 'Tablet'];
      this.pieChartData = [30, 50, 20];
    })
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
      let name: String = value.name;
      if (name.toLowerCase().includes(searchKey.toLowerCase())) {
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

  selectUser(id: Number, name: String, email: String) {
    console.log(name);
    console.log(email);
    this.globals.notification_test_list.forEach(function (value: any) {
      if (document.getElementById('userButton' + value.id) != null) {
        document.getElementById(
          'userButton' + value.id
        )!.style.backgroundColor = '#f8f8f8';
        document.getElementById('userButton' + value.id)!.style.color =
          '#707070';
        document.getElementById('userButton' + value.id)!.style.border =
          '2px solid #707070';
      }
    });
    try {
      document.getElementById('userButton' + id)!.style.backgroundColor =
        '#F49700';
      document.getElementById('userButton' + id)!.style.color = '#fff';
      document.getElementById('userButton' + id)!.style.border = 'none';

      this.user = { id, name, email };
    } catch (e) {
      console.log(e);
    }
    console.log(this.user);
  }

  userSelected() {
    console.log('clicked on next');
    if (this.user != undefined) {
      document.getElementById('list')!.style.display = 'none';
      document.getElementById('next')!.style.display = 'none';
      document.getElementById('search')!.style.display = 'none';
      document.getElementById('icon_search')!.style.display = 'none';
      document.getElementById('list')!.style.zIndex = '0';
      document.getElementById('home__other-input')!.style.display = 'block';
      document.getElementById('switchButtonEveryone')!;
      this.isDisabled = true;
    } else {
      console.log('geen user geselecteerd');
    }
  }

  sendNotification() {
    let titleInput = <HTMLInputElement>document.getElementById('title');
    let title: any = titleInput.value;
    let descriptionInput = <HTMLInputElement>(
      document.getElementById('description')
    );
    let description = descriptionInput.value;
    console.log(title);
    console.log(description);
    this.isDisabled = false;

    if (title != '' && description != '') {
      console.log(
        'send notification to: ' +
        this.user.name +
        ' (' +
        this.user.email +
        ')\n' +
        'With title: ' +
        title +
        '\nand description: ' +
        description +
        ';'
      );
      this.resetOnePersonNotification();
    }
  }

  sendNotificationToEveryone() {
    let titleInput = <HTMLInputElement>document.getElementById('titleEveryone');
    let title: any = titleInput.value;
    let descriptionInput = <HTMLInputElement>(
      document.getElementById('descriptionEveryone')
    );
    let description = descriptionInput.value;
    console.log(title);
    console.log(description);
    this.isDisabled = false;

    if (title != '' && description != '') {
      this.api.sendNotificationToEveryone(description, title).subscribe(data => {
        console.log(data)
      })
      this.resetOnePersonNotification();
    }
  }

  resetOnePersonNotification() {
    let titleInput = <HTMLInputElement>document.getElementById('title');
    let title: any = titleInput.value;
    let descriptionInput = <HTMLInputElement>(
      document.getElementById('description')
    );
    let description = descriptionInput.value;

    this.globals.notification_test_list.forEach(function (value: any) {
      if (document.getElementById('userButton' + value.id) != null) {
        document.getElementById(
          'userButton' + value.id
        )!.style.backgroundColor = '#f8f8f8';
        document.getElementById('userButton' + value.id)!.style.color =
          '#707070';
        document.getElementById('userButton' + value.id)!.style.border =
          '2px solid #707070';
      }
    });

    titleInput.value = '';
    descriptionInput.value = '';

    this.user = undefined;

    document.getElementById('home__other-input')!.style.display = 'none';
    document.getElementById('next')!.style.display = 'block';
    document.getElementById('search')!.style.display = 'block';
    document.getElementById('icon_search')!.style.display = 'block';
    document.getElementById('list')!.style.zIndex = '1';
    document.getElementById('home__other-input')!.style.zIndex = '1';
    document.getElementById('list')!.style.display = 'flex';
  }

  switchNotificationEveryone() {
    document.getElementById('everyoneNotification')!.style.display = 'flex';
    document.getElementById('onePersonNotifications')!.style.display = 'none';
    this.notificationToEveryone = true;
    document.getElementById('switchButtonOnePerson')!.style.background =
      '#EFEFEF';
    document.getElementById('switchButtonEveryone')!.style.background =
      '#F49701';
    document.getElementById('switchButtonEveryone')!.style.color = '#FFF';
    document.getElementById('switchButtonOnePerson')!.style.color = '#707070';
  }

  switchNotificationOnePerson() {
    document.getElementById('everyoneNotification')!.style.display = 'none';
    document.getElementById('onePersonNotifications')!.style.display = 'flex';
    this.notificationToEveryone = false;
    this.isDisabled = false;
    document.getElementById('switchButtonOnePerson')!.style.background =
      '#F49701';
    document.getElementById('switchButtonEveryone')!.style.background =
      '#EFEFEF';
    document.getElementById('switchButtonEveryone')!.style.color = '#707070';
    document.getElementById('switchButtonOnePerson')!.style.color = '#FFF';
    this.resetOnePersonNotification();
  }

  public lineChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7'];
  public lineChartData: ChartDataSets[] = [
    { data: [0, 1, 4, 2, 3, 1, 2], label: 'Logins in de app' },
  ];
  public lineChartDataOrders: ChartDataSets[] = [
    { data: [3, 2, 3, 1, 1, 0, 2], label: 'Bestellingen vanuit de app' },
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

  generateFakeData() {
    for (let i = 0; i < 30; i++) {
      this.globals.notification_test_list.push({
        id: i + 1,
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        email:
          faker.name.firstName() + '' + faker.name.lastName() + '@gmail.com',
      });
      console.log('user ' + i + ' is gemaakt');
    }
  }

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
