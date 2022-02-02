import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesReceivablesComponent } from './fees-receivables.component';

describe('FeesReceivablesComponent', () => {
  let component: FeesReceivablesComponent;
  let fixture: ComponentFixture<FeesReceivablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesReceivablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesReceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
