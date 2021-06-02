import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterContentChecked {

  constructor(
    public globals: Globals,
    public router: Router,
    private cdRef: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.globals.page_login_active = true;
  }

  ngAfterContentChecked() {
    // this.globals.page_login_active = true;
    this.cdRef.detectChanges();
  }

  login() {
    this.router.navigate(['/home']);
  }

}
