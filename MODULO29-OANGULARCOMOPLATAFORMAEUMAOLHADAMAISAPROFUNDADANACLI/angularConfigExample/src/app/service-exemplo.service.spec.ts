import { TestBed } from '@angular/core/testing';

import { ServiceExemploService } from './service-exemplo.service';

describe('ServiceExemploService', () => {
  let service: ServiceExemploService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceExemploService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
