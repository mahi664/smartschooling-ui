import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSalaryDetailsComponent } from './user-salary-details.component';

describe('UserSalaryDetailsComponent', () => {
  let component: UserSalaryDetailsComponent;
  let fixture: ComponentFixture<UserSalaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSalaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSalaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
