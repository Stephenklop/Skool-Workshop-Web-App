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

  public email = '';
  public password = '';
  public error: boolean = false;

  public stayLoggedIn: boolean = false;
  public enableLoginButton: boolean = false;

  ngOnInit(): void {
    let emailField = <HTMLInputElement>document.getElementById('login-email')!;
    let passwordField = <HTMLInputElement>document.getElementById('login-password')!;
    if (emailField.value !== '' && passwordField.value !== '') {
      this.enableLoginButton = true;
    } else {
      this.enableLoginButton = false;
    }
  }

  public login() {

    let loader = document.getElementById('loader')!;
    loader.style.display = 'flex';
    // Validation patterns
    let patternEmail = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');
    let patternPassword = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');

    // Error
    let errorMessage = document.getElementById('loginFailedPopUp')!;

    // Check if email is valid
    if (patternEmail.test(this.email)) {

      // Check if password is valid
      if (patternPassword.test(this.password)) {

        // Login and receive data from the API
        this.api.login(this.email, this.password).subscribe(data => {

          console.log(data);

          if (data.result.role === 'administrator') {
            this.globals.loader_finished = false;

            this.globals.login_token = data.result.token;

            this.globals.currentlyLoggedIn = true;

            this.globals.user = {
              name: data.result.first_name + ' ' + data.result.last_name,
              email: data.result.email,
              role: data.result.role,
              username: data.result.username,
              id: data.result.id,
            };

            Promise.all([this.getCustomers(), this.getLoginAnalytics(), this.getOrderAnalytics(), this.getAppOpenAnalytics()])
              .then(res => {
                this.router.navigate(['/home']);
                this.globals.loader_finished = true;
              });
          }

        });
      } else {
        this.error = true;
      }
    } else {
      this.error = true;
    }

  }

  getCustomers() {
    return new Promise((res, rej) => {
      this.api.getAllCustomers().subscribe((data) => {

        console.log(data);

        if (data.error) {
          rej(data.error);
        } else {
          let userList: any = [];
          data.result.forEach((element: any) => {

            // const name = element.first_name + ' ' + element.last_name;
            // const email = element.email;
            // const id = element.id;
            // userList.push({ name: name, email: email, id: id });
            console.log(element.meta_data);
            console.log(element.meta_data.key);
            element.meta_data.forEach((metaData: any) => {
              if (metaData.key === "_firebase_tokens") {
                if (metaData.value.length > 0) {
                  const tokens: Array<any> = metaData.value
                  const name = element.first_name + ' ' + element.last_name;
                  const email = element.email;
                  const id = element.id;
                  userList.push({ name: name, email: email, id: id, tokens: tokens });
                }
              }
            });
          });
          this.globals.notification_test_list = userList;
          res(data.result);
        }
      });
    });
  }

  getLoginAnalytics() {
    return new Promise((res, rej) => {
      this.api.getLoginAnalytics().subscribe((data: any) => {
        if (data.error) {
          rej(data.error);
        } else {
          this.globals.loginAnalytics = data.result;
          res(data.result);
        }
      });
    });
  }

  getOrderAnalytics() {
    return new Promise((res, rej) => {
      this.api.getOrderAnalytics().subscribe((data: any) => {
        if (data.error) {
          rej(data.error);
        } else {
          this.globals.orderAnalytics = data.result;
          res(data.result);
        }
      });
    });
  }

  getAppOpenAnalytics() {
    return new Promise((res, rej) => {
      this.api.getAppOpenAnalytics().subscribe((data: any) => {
        if (data.error) {
          rej(data.error);
        } else {
          this.globals.appOpenAnalytics = data.result;
          res(data.result);
        }
      });
    });
  }
}
