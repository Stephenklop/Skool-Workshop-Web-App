import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  private activatedRoute: any;
  private customerId = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.activatedRoute.unsubscribe();
  }

  getIdFromUrl():void {
    this.activatedRoute = this.route.params.subscribe(params => {
      this.customerId = params['id'];
    });
  }
}
