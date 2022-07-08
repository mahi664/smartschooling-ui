import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleDetailsComponent } from './user-role-details.component';

describe('UserRoleDetailsComponent', () => {
  let component: UserRoleDetailsComponent;
  let fixture: ComponentFixture<UserRoleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
