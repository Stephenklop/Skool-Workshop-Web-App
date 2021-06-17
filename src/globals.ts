import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  loader_finished: boolean = true;

  currentlyLoggedIn: boolean = false;
  user: any = null;

  page_login_active: boolean = true;
  page_forgotpass_active: boolean = false;

  quiz_list_original: Array<any> = [];

  login_token: String = '';
  notification_test_list: Array<any> = [];
  notification_used_list: Array<any> = [];

  loginAnalytics: Array<any> = [];
  orderAnalytics: Array<any> = [];
  appOpenAnalytics: Array<any> = [];

  // New variables
  user_details = null;
}
