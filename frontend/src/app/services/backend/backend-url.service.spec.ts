import { TestBed } from '@angular/core/testing';

import { BackendURLService } from './backend-url.service';

describe('BackendURLService', () => {
  let service: BackendURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
