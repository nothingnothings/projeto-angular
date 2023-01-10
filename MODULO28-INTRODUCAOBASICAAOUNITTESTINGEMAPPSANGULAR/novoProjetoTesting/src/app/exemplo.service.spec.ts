import { TestBed } from '@angular/core/testing';

import { ExemploService } from './exemplo.service';

describe('ExemploService', () => {
  let service: ExemploService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExemploService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have property "exemplo" with name property of "EXEMPLO" ', () => {
    expect(service.user.name).toEqual('EXEMPLO');
  });


});
