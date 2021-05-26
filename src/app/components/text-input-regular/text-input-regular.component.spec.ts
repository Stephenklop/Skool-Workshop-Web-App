import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputRegularComponent } from './text-input-regular.component';

describe('TextInputRegularComponent', () => {
  let component: TextInputRegularComponent;
  let fixture: ComponentFixture<TextInputRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextInputRegularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
