import { Component, OnInit } from '@angular/core';
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
  ) {}

  public stayLoggedIn: boolean = false;

  ngOnInit(): void {}

  public changeStayLoggedIn() {
    if (this.stayLoggedIn) {
      this.stayLoggedIn = false;
    } else {
      this.stayLoggedIn = true;
    }
  }

  login() {
    // document.querySelector('')
    let emailInput = <HTMLInputElement>document.getElementById('login-email')!;
    let passwordInput = <HTMLInputElement>(
      document.getElementById('login-password')!
    );

    this.globals.loader_finished = false;

    this.api.login(emailInput.value, passwordInput.value).subscribe((data) => {
      console.log(data);
      if (data.error == undefined) {
        if (data.result.role === 'administrator') {
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
      }
    });
  }

  getCustomers() {
    this.api.getAllCustomers().subscribe((data) => {
      console.log(data);
      console.log(data.result);
      let userList: any = [];
      data.result.forEach((element: any) => {
        const name = element.first_name + ' ' + element.last_name;
        const email = element.email;
        const id = element.id;
        userList.push({ name: name, email: email, id: id });
      });
      this.globals.notification_test_list = userList;
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
      this.router.navigate(['/home']);
      this.globals.loader_finished = true;
    });
  }
}
