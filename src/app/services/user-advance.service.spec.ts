import { TestBed } from '@angular/core/testing';

import { UserAdvanceService } from './user-advance.service';

describe('UserAdvanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAdvanceService = TestBed.get(UserAdvanceService);
    expect(service).toBeTruthy();
  });
});
