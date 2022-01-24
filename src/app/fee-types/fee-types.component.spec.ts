import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTypesComponent } from './fee-types.component';

describe('FeeTypesComponent', () => {
  let component: FeeTypesComponent;
  let fixture: ComponentFixture<FeeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
