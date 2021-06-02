import { Component, OnDestroy, OnInit } from '@angular/core';
import * as faker from 'faker';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  public customers: any = [];
  public totalCustomers: any = 0;
  public averageOrder: any = 0;
  public averageExpense: any = 0;
  public averageOrderWorth: any = 0;

  constructor() { }
  ngOnInit(): void {
    this.generateFakeDate();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
  }

  generateFakeDate() {
    let id = 1;
    
    for (let i = 0; i < 30; i++) {
      let orders = 0;
      let expense = 0;
      let orderWorth = 0;

      this.customers.push({
        id: id,
        name: faker.name.firstName() + " " + faker.name.lastName(),
        username: faker.internet.userName(),
        lastActive: faker.date.recent(),
        dateRegistered: faker.date.past(),
        email: faker.internet.email(),
        orders: Math.random() * 100,
        totalExpenses: faker.finance.amount(),
        aov: faker.finance.amount(),
        country: faker.address.country(),
        town: faker.address.city(),
        zipcode: faker.address.zipCode()
      });

      this.totalCustomers++;

      orders += Math.random() * 100;
      this.averageOrder = Math.round(orders / this.customers.length);

      expense += parseInt(faker.finance.amount());
      this.averageExpense = Math.round(expense / this.customers.length);

      orderWorth += parseInt(faker.finance.amount());
      this.averageOrderWorth = Math.round(orderWorth / this.customers.length);

      console.log(id);
      id++;
    }
  }
}
