import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStatsComponent } from './login-stats.component';

describe('LoginStatsComponent', () => {
  let component: LoginStatsComponent;
  let fixture: ComponentFixture<LoginStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
