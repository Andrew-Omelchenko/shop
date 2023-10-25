import { TestBed } from '@angular/core/testing';

import { TimingInterceptor } from './timing.interceptor';

describe('TimingInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [TimingInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: TimingInterceptor = TestBed.inject(TimingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
