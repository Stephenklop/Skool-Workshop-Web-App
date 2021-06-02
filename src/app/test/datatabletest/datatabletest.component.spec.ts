import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatabletestComponent } from './datatabletest.component';

describe('DatatabletestComponent', () => {
  let component: DatatabletestComponent;
  let fixture: ComponentFixture<DatatabletestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatabletestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatabletestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
