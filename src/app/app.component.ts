import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Globals } from '../globals';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public globals: Globals, public router: Router) { 
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        gtag('config', 'xx-xxxxx-xx', {
          'page_path': e.urlAfterRedirects
        });
      }
    })
  }
}
