import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridtestComponent } from './gridtest.component';

describe('GridtestComponent', () => {
  let component: GridtestComponent;
  let fixture: ComponentFixture<GridtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
