import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() widget: any;

  constructor(public globals: Globals, private api: ApiService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.globals.notification_used_list = this.globals.notification_test_list;
  }

  public searchValue: String = "";
  public selectedUser: any = {};
  public backButtonActive: boolean = false;

  public user: any = undefined;
  public notificationToEveryone: boolean = false;
  public isDisabled: boolean = false;

  public titleValue: String = "";
  public urlValue: String = "";
  public descValue: String = "";

  filterList() {
    let filteredList: any = [];
    this.globals.notification_test_list.forEach((value: any) => {
      if (value.name.toLowerCase().includes(this.searchValue.toLowerCase()) || value.email.toLowerCase().includes(this.searchValue.toLowerCase())) {
        filteredList.push(value);
      }
    });
    this.globals.notification_used_list = filteredList;
    this.changeDetection.detectChanges();
  }

  backToChooser() {
    this.showChooser();
  }

  onePersonOnClick(value: any) {
    console.log(value);
    this.selectedUser = value;
    this.showForm();
    document.getElementById('switchButtonBack')!.style.display = 'block';
  }

  switchNotificationEveryone() {
    console.log("naar iedereen")
    document.getElementById('switchButtonEveryone')!.classList.remove("active");
    document.getElementById('switchButtonOnePerson')!.classList.add("active");
    this.showChooser();
  }

  switchNotificationOnePerson() {
    console.log("naar een persoon")
    document.getElementById('switchButtonEveryone')!.classList.add("active");
    document.getElementById('switchButtonOnePerson')!.classList.remove("active");
    this.notificationToEveryone = true;
    this.showForm();
  }

  showChooser() {
    document.getElementById('switchButtonBack')!.style.display = 'none';
    document.getElementById('chooser')!.style.display = 'flex';
    document.getElementById('searchBar')!.style.display = 'flex';
    document.getElementById('notificationForm')!.style.display = 'none';
  }

  showForm() {
    document.getElementById('chooser')!.style.display = 'none';
    document.getElementById('searchBar')!.style.display = 'none';
    document.getElementById('notificationForm')!.style.display = 'block';
  }

  sendNotification() {
    this.isDisabled = false;

    // Send notification to everyone
    if(this.notificationToEveryone) {
      this.isDisabled = false;

      if (this.titleValue != '' && this.descValue != '') {
        this.api.sendNotificationToEveryone(this.descValue, this.titleValue).subscribe(data => {
          console.log(data)
        })
        this.resetForm();
      }

      // Send notifications to specific person
    } else {
      if (this.titleValue != '' && this.descValue != '') {
        console.log(
          'send notification to: ' +
          this.selectedUser.name +
          ' (' +
          this.selectedUser.email +
          ')\n' +
          'With title: ' +
          this.titleValue +
          '\nand description: ' +
          this.descValue +
          ';'
        );
        this.api.sendNotificationToAccount(this.descValue, this.titleValue, this.selectedUser.tokens).subscribe(data => {
          console.log(data)
        })
        this.resetForm();
      }
    }
  }

  resetForm() {
    this.titleValue = '';
    this.urlValue = '';
    this.descValue = '';
  }
}
