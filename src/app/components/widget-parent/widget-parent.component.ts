import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-widget-parent',
  templateUrl: './widget-parent.component.html',
  styleUrls: ['./widget-parent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class WidgetParentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() widget: any;
}
