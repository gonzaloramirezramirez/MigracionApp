import { TestBed } from '@angular/core/testing';

import { OperacionesServiceService } from './operaciones-service.service';

describe('OperacionesServiceService', () => {
  let service: OperacionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
