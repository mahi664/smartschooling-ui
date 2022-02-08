import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeesNewPaymentComponent } from './student-fees-new-payment.component';

describe('StudentFeesNewPaymentComponent', () => {
  let component: StudentFeesNewPaymentComponent;
  let fixture: ComponentFixture<StudentFeesNewPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFeesNewPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFeesNewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
