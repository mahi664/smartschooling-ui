import { TestBed } from '@angular/core/testing';

import { LeaveTpesService } from './leave-tpes.service';

describe('LeaveTpesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveTpesService = TestBed.get(LeaveTpesService);
    expect(service).toBeTruthy();
  });
});
