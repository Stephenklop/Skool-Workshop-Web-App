import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public globals: Globals) { }

  ngOnInit(): void {
  }

}
