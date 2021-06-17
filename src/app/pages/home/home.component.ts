import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable } from 'angular-gridster2';
import { Globals } from 'src/globals';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppComponent } from 'src/app/app.component';

interface Safe extends GridsterConfig {
  draggable: Draggable,
  resizable: Resizable,
  pushDirections: PushDirections
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public options!: Safe;
  public dashboard!: Array<GridsterItem>

  constructor(
    public router: Router,
    public globals: Globals,
    private api: ApiService
  ) { }

  ngOnInit(): void {

    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 25,
      outerMargin: true,
      mobileBreakpoint: 640,
      minCols: 3,
      maxCols: 6,
      minRows: 2,
      maxRows: 3,
      maxItemCols: 4,
      minItemCols: 1,
      maxItemRows: 4,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      disableScrollVertical: true,
      disableScrollHorizontal: true,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: true,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };

    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0, type: "login-stats" },
      { cols: 2, rows: 1, y: 0, x: 2, type: "open-stats" },
      { cols: 2, rows: 1, y: 0, x: 4, type: "order-stats" },
      { cols: 3, rows: 1, y: 1, x: 0, type: "notifications" },
      { cols: 3, rows: 1, y: 1, x: 4, type: "quiz" },
      // { cols: 1, rows: 1, y: 1, x: 0 },
      // { cols: 1, rows: 1, y: 1, x: 0 },
      // { cols: 2, rows: 2, y: 3, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2' },
      // { cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2' },
      // { cols: 1, rows: 1, y: 2, x: 6 }
    ];
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item: any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }
}
