import { Injectable } from '@angular/core';

@Injectable()

export class Globals {
    loader_finished: boolean = true;

    currentlyLoggedIn: boolean = false;

    page_login_active: boolean = true;
    page_forgotpass_active: boolean = false;

    login_token: String = '';
    notification_test_list: Array<any> = [];
    notification_used_list: Array<any> = [];
}