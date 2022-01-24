import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeeTypeComponent } from './new-fee-type.component';

describe('NewFeeTypeComponent', () => {
  let component: NewFeeTypeComponent;
  let fixture: ComponentFixture<NewFeeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFeeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
