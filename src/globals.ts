import { Injectable } from '@angular/core';

@Injectable()

export class Globals {
    loader_finished: boolean = true;

    page_login_active: boolean = false;
    page_forgotpass_active: boolean = false;

    notification_test_list: Array<any> = [];
    notification_used_list: Array<any> = [];
}