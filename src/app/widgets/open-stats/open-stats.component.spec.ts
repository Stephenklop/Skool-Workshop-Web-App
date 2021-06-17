import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenStatsComponent } from './open-stats.component';

describe('OpenStatsComponent', () => {
  let component: OpenStatsComponent;
  let fixture: ComponentFixture<OpenStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
