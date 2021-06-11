import { Component, OnInit, Query } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public globals: Globals,
    public router: Router,
    private api: ApiService
  ) { }

  public stayLoggedIn: boolean = false;
  public enableLoginButton: boolean = false;

  ngOnInit(): void {
    let emailField = <HTMLInputElement>document.getElementById('login-email')!;
    let passwordField = <HTMLInputElement>(
      document.getElementById('login-password')!
    );

    emailField.addEventListener('input', (event) => {
      if (emailField.value !== '') {
        this.enableLoginButton = true;
      } else {
        this.enableLoginButton = false;
      }
    });

    passwordField.addEventListener('input', (event) => {
      if (passwordField.value !== '') {
        this.enableLoginButton = true;
      } else {
        this.enableLoginButton = false;
      }
    });
  }

  public changeStayLoggedIn() {
    if (this.stayLoggedIn) {
      this.stayLoggedIn = false;
    } else {
      this.stayLoggedIn = true;
    }
  }

  login() {
    // document.querySelector('')
    let loader = document.getElementById('loader')!;
    loader.style.display = 'flex';
    let emailInput = <HTMLInputElement>document.getElementById('login-email')!;
    let passwordInput = <HTMLInputElement>(
      document.getElementById('login-password')!
    );

    this.api.login(emailInput.value, passwordInput.value).subscribe((data) => {
      console.log(data);
      if (data.error == undefined) {
        if (data.result.role === 'administrator') {
          this.globals.loader_finished = false;
          this.globals.login_token = data.result.token;

          this.getCustomers();

          if (this.stayLoggedIn) {
            console.log('stay logged in');
            sessionStorage.setItem('loggedIn', 'true');
          }

          this.globals.currentlyLoggedIn = true;
          this.globals.user = {
            name: data.result.first_name + ' ' + data.result.last_name,
            email: data.result.email,
            role: data.result.role,
            username: data.result.username,
            id: data.result.id,
          };
        } else {
          this.globals.loader_finished = true;
          console.log('geen rechten om in te loggen');
        }
      } else {
        let popup = document.getElementById('loginFailedPopUp')!;
        popup.style.display = 'block';
        loader.style.display = 'none';
      }
    });
  }

  myFunction() {
    var popup = document.getElementById('myPopup')!;
    popup.classList.toggle('show');
  }

  getCustomers() {
    this.api.getAllCustomers().subscribe((data) => {
      console.log(data);
      console.log(data.result);
      let userList: any = [];
      data.result.forEach((element: any) => {
        console.log(element.meta_data);
        console.log(element.meta_data.key);
        element.meta_data.forEach((metaData: any) => {
          if (metaData.key === "_firebase_tokens") {
            const tokens: Array<any> = metaData.value
            const name = element.first_name + ' ' + element.last_name;
            const email = element.email;
            const id = element.id;
            userList.push({ name: name, email: email, id: id, tokens: tokens });
          }
        });
      });
      this.globals.notification_test_list = userList;
      console.log(this.globals.notification_test_list);
      this.getQuizes();
    });
  }

  getQuizes() {
    this.api.getAllQuizes().subscribe((data: any) => {
      console.log(data);
      console.log(data.quiz);
      if (data.quiz.length != 0) {
        this.globals.quiz_list_original = data.quiz;
      }
      this.getLoginAnalytics();
    });
  }

  getLoginAnalytics() {
    this.api.getLoginAnalytics().subscribe((data: any) => {
      console.log(data);
      this.globals.loginAnalytics = data.result;
      this.getOrderAnalytics();
    })
  }

  getOrderAnalytics() {
    this.api.getOrderAnalytics().subscribe((data: any) => {
      console.log(data);
      this.globals.orderAnalytics = data.result;
      this.getAppOpenAnalytics();
    })
  }

  getAppOpenAnalytics() {
    this.api.getAppOpenAnalytics().subscribe((data: any) => {
      console.log(data);
      this.globals.appOpenAnalytics = data.result;
      this.router.navigate(['/home']);
      this.globals.loader_finished = true;
    })
  }
}
