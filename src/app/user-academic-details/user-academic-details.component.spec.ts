import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcademicDetailsComponent } from './user-academic-details.component';

describe('UserAcademicDetailsComponent', () => {
  let component: UserAcademicDetailsComponent;
  let fixture: ComponentFixture<UserAcademicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAcademicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAcademicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
