import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleConfigurationComponent } from './role-configuration.component';

describe('RoleConfigurationComponent', () => {
  let component: RoleConfigurationComponent;
  let fixture: ComponentFixture<RoleConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
