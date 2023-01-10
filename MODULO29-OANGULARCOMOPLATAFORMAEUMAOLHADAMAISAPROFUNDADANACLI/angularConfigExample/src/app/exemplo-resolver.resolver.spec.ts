import { TestBed } from '@angular/core/testing';

import { ExemploResolverResolver } from './exemplo-resolver.resolver';

describe('ExemploResolverResolver', () => {
  let resolver: ExemploResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ExemploResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
