import { TestBed } from '@angular/core/testing';

import { ProductsPromiseLoaderService } from './products-promise-loader.service';

describe('ProductsPromiseLoaderService', () => {
  let service: ProductsPromiseLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsPromiseLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
