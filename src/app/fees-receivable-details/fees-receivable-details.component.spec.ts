import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesReceivableDetailsComponent } from './fees-receivable-details.component';

describe('FeesReceivableDetailsComponent', () => {
  let component: FeesReceivableDetailsComponent;
  let fixture: ComponentFixture<FeesReceivableDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesReceivableDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesReceivableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
