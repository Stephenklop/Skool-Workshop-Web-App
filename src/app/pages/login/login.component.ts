import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public globals: Globals,
    public router: Router,
    private api: ApiService
  ) { }

  public stayLoggedIn: boolean = false;

  ngOnInit(): void {
    this.globals.loader_finished = false;
    if (sessionStorage.getItem("loggedIn") != undefined) {
      if (sessionStorage.getItem("loggedIn") == "true") {
        this.router.navigate(['/home']);
        this.globals.loader_finished = true;
      }
    }
    this.globals.loader_finished = true;
  }

  login() {
    // document.querySelector('')
    let emailInput = <HTMLInputElement>document.getElementById("login-email")!
    let passwordInput = <HTMLInputElement>document.getElementById("login-password")!

    this.globals.loader_finished = false;

    this.api.login(emailInput.value, passwordInput.value).subscribe(data => {
      console.log(data);
      if (data.error == undefined) {
        this.globals.login_token = data.result.token;
        this.getCustomers();

        console.log(this.stayLoggedIn)
        if (this.stayLoggedIn) {
          console.log("stay logged in")
          sessionStorage.setItem("loggedIn", "true")
        }
        this.globals.currentlyLoggedIn = true;
        this.router.navigate(['/home']);
        this.globals.loader_finished = true;
      } else {
        this.globals.loader_finished = true;
      }
    });

  }

  getCustomers() {
    this.api.getAllCustomers().subscribe(data => {
      console.log(data);
    })
  }
}
