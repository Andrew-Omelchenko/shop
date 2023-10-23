import { TestBed } from '@angular/core/testing';

import { CartObservableLoaderService } from './cart-observable-loader.service';

describe('CartObservableLoaderService', () => {
  let service: CartObservableLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartObservableLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
