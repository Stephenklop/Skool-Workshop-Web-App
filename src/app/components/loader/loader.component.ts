import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(public globals: Globals) { }

  ngOnInit(): void {
  }

}
