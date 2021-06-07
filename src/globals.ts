import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  loader_finished: boolean = true;

  currentlyLoggedIn: boolean = false;
  user: any = null;

  page_login_active: boolean = true;
  page_forgotpass_active: boolean = false;

  quiz_list_original: Array<any> = [
    { id: 1, title: 'testquiz', link: 'blablalink' },
    { id: 2, title: 'testquiz', link: 'blablalink' },
  ];

  login_token: String = '';
  notification_test_list: Array<any> = [];
  notification_used_list: Array<any> = [];
}
