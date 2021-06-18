import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  loader_finished: boolean = true;

  currentlyLoggedIn: boolean = false;
  user: any = null;

  page_login_active: boolean = true;
  page_forgotpass_active: boolean = false;

  quiz_list_original: any = [];

  login_token: String = '';
  notification_test_list: Array<any> = [{ name: "Bas buijsen", email: "bbuijsen@gmail.com", id: 70 }];
  notification_used_list: Array<any> = [];

  loginAnalytics: Array<any> = [];
  orderAnalytics: Array<any> = [];
  appOpenAnalytics: Array<any> = [];

  // New variables
  user_details = null;
}
