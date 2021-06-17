import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() widget: any;

  constructor(public globals: Globals, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.globals.notification_used_list = this.globals.notification_test_list;
  }

  public searchValue: String = "";
  public selectedUser: any = {};
  public backButtonActive: boolean = false;

  public user: any = undefined;
  public notificationToEveryone: boolean = false;
  public isDisabled: boolean = false;

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

}
