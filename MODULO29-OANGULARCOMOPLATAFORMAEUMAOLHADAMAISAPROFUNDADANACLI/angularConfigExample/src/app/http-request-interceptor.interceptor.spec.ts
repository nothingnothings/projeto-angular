import { TestBed } from '@angular/core/testing';

import { HttpRequestInterceptorInterceptor } from './http-request-interceptor.interceptor';

describe('HttpRequestInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpRequestInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpRequestInterceptorInterceptor = TestBed.inject(HttpRequestInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
