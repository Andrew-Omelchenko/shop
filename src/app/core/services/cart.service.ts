import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItemModel } from '../models/cart-item.model';
import { CartContentModel } from '../models/cart-content.model';

interface CartModel {
  itemsMap: Map<number, CartItemModel>;
  qty: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$$: BehaviorSubject<CartModel> = new BehaviorSubject<CartModel>({
    itemsMap: new Map<number, CartItemModel>([]),
    qty: 0,
    total: 0,
  });

  get totalQuantity(): number {
    return this.cart$$.getValue().qty;
  }

  get totalCost(): number {
    return this.cart$$.getValue().total;
  }

  get isEmptyCart(): boolean {
    return this.cart$$.getValue().itemsMap.size === 0;
  }

  getCartObservable(): Observable<CartContentModel> {
    return this.cart$$.asObservable().pipe(
      map(({ itemsMap, qty, total }) => ({
        qty,
        total,
        items: Array.from(itemsMap.values()),
      })),
    );
  }

  getProducts(): CartItemModel[] {
    return Array.from(this.cart$$.getValue().itemsMap.values());
  }

  addProduct(product: ProductModel): void {
    if (product?.id >= 0) {
      const { itemsMap } = this.cart$$.getValue();
      // adds product only if it's absent from cart
      if (!itemsMap.has(product.id)) {
        const newItemsMap = itemsMap.set(product.id, { ...product, qty: 1 });
        this.cart$$.next({
          itemsMap: newItemsMap,
          qty: getTotalQty(newItemsMap),
          total: getTotalCost(newItemsMap),
        });
      }
    }
  }

  removeProduct(itemId: number): void {
    if (itemId >= 0) {
      const { itemsMap } = this.cart$$.getValue();
      itemsMap.delete(itemId);
      this.cart$$.next({
        itemsMap,
        qty: getTotalQty(itemsMap),
        total: getTotalCost(itemsMap),
      });
    }
  }

  increaseQuantity(productId: number): void {
    this.changeQuantityBy(productId, 1);
  }

  decreaseQuantity(productId: number): void {
    this.changeQuantityBy(productId, -1);
  }

  removeAllProducts(): void {
    this.cart$$.next({
      itemsMap: new Map<number, CartItemModel>([]),
      qty: 0,
      total: 0,
    });
  }

  private changeQuantityBy(productId: number, delta: number): void {
    const { itemsMap } = this.cart$$.getValue();
    const oldItem = itemsMap.get(productId);
    if (oldItem) {
      const newItemsMap = itemsMap.set(productId, { ...oldItem, qty: oldItem.qty + delta });
      this.cart$$.next({
        itemsMap: newItemsMap,
        qty: getTotalQty(newItemsMap),
        total: getTotalCost(newItemsMap),
      });
    }
  }
}

function getTotalQty(itemsMap: Map<number, CartItemModel>): number {
  return !itemsMap.size ? 0 : Array.from(itemsMap.keys()).reduce((acc, key) => acc + (itemsMap.get(key)?.qty || 0), 0);
}

function getTotalCost(itemsMap: Map<number, CartItemModel>): number {
  return !itemsMap.size
    ? 0
    : Array.from(itemsMap.keys()).reduce((acc, key) => {
        const item = itemsMap.get(key);
        return acc + (item?.qty || 0) * (item?.price || 0);
      }, 0);
}
