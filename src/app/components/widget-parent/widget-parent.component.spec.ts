import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetParentComponent } from './widget-parent.component';

describe('WidgetParentComponent', () => {
  let component: WidgetParentComponent;
  let fixture: ComponentFixture<WidgetParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
