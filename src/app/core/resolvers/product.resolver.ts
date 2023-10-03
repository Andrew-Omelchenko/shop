import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProductModel } from '../models/product.model';
import { inject } from '@angular/core';
import { ProductsLoaderService } from '../loaders/products-loader.service';
import { of } from 'rxjs';
import { Category } from '../models/common.types';

export const EMPTY_PRODUCT = {
  id: 0,
  name: '',
  description: '',
  price: 0,
  category: Category.Shopping,
  isAvailable: false,
};

export const productResolver: ResolveFn<ProductModel> = (route: ActivatedRouteSnapshot) => {
  const productsLoaderService = inject(ProductsLoaderService);

  const idStrOrNull = route ? route.paramMap.get('id') : null;

  const product = productsLoaderService.getProductById(Number(idStrOrNull));

  if (product) {
    return of(product);
  } else {
    return of(EMPTY_PRODUCT);
  }
};
