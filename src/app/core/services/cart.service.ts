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
    if (product?.id >= 0) {
      const oldItem = itemsMap.get(product.id);
      if (!oldItem) {
        this.items$.next(itemsMap.set(product.id, { ...product, qty: 1 }));
      } else {
        this.items$.next(itemsMap.set(product.id, { ...oldItem, qty: oldItem.qty + 1 }));
      }
    }
  }

  getTotalCost(): number {
    const itemsMap = this.items$.getValue();
    return !itemsMap.size
      ? 0
      : Array.from(itemsMap.keys()).reduce((acc, key) => {
          const item = itemsMap.get(key);
          return acc + (item?.qty || 0) * (item?.price || 0);
        }, 0);
  }

  getTotalQuantity(): number {
    const itemsMap = this.items$.getValue();
    return !itemsMap.size
      ? 0
      : Array.from(itemsMap.keys()).reduce((acc, key) => acc + (itemsMap.get(key)?.qty || 0), 0);
  }
}
