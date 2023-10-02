import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CartService } from '../services/cart.service';

export const cartNotEmptyGuard: CanActivateFn = () => {
  const router = inject(Router);
  const cartService = inject(CartService);
  return !cartService.isEmptyCart ? true : router.parseUrl('/cart');
};
