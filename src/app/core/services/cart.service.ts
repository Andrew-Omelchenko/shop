import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItemModel } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items$: BehaviorSubject<Map<number, CartItemModel>> = new BehaviorSubject<Map<number, CartItemModel>>(
    new Map<number, CartItemModel>([]),
  );
  getItemsObs(): Observable<CartItemModel[]> {
    return this.items$.asObservable().pipe(map((itemsMap) => Array.from(itemsMap.values())));
  }

  addItem(product: ProductModel): void {
    const itemsMap = this.items$.getValue();
    if (product?.id >= 0 && !itemsMap.has(product.id)) {
      this.items$.next(itemsMap.set(product.id, { ...product, qty: 0 }));
    }
  }
}
