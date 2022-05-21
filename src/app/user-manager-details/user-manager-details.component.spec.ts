import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagerDetailsComponent } from './user-manager-details.component';

describe('UserManagerDetailsComponent', () => {
  let component: UserManagerDetailsComponent;
  let fixture: ComponentFixture<UserManagerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
