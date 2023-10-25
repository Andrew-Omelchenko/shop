import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { BehaviorSubject, catchError, map, Observable, of, take } from 'rxjs';
import { CartItemModel } from '../models/cart-item.model';
import { CartContentModel } from '../models/cart-content.model';
import { CartObservableLoaderService } from '../loaders/cart-observable-loader.service';

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

  constructor(private readonly cartObservableLoaderService: CartObservableLoaderService) {
    this.cartObservableLoaderService
      .getCartItems()
      .pipe(
        take(1),
        catchError((e) => {
          console.log('Error loading cart: ', e);
          return of([] as CartItemModel[]);
        }),
      )
      .subscribe((cartItems) => {
        const itemsMap = new Map<number, CartItemModel>(cartItems.map((item) => [item.id, item]));
        this.cart$$.next({
          itemsMap,
          qty: cartItems.reduce((acc, { qty }) => acc + qty, 0),
          total: cartItems.reduce((acc, { price, qty }) => acc + price * qty, 0),
        });
      });
  }

  get totalQuantity(): number {
    return this.cart$$.value.qty;
  }

  get totalCost(): number {
    return this.cart$$.value.total;
  }

  get isEmptyCart(): boolean {
    return this.cart$$.value.itemsMap.size === 0;
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
    return Array.from(this.cart$$.value.itemsMap.values());
  }

  addProduct(product: ProductModel): void {
    if (product?.id >= 0) {
      const { itemsMap } = this.cart$$.value;
      // adds product only if it's absent from the cart
      if (!itemsMap.has(product.id)) {
        this.cartObservableLoaderService
          .createCartItem({ ...product, qty: 1 })
          .pipe(take(1))
          .subscribe({
            next: (item) => {
              const newItemsMap = itemsMap.set(item.id, { ...item, qty: 1 });
              this.cart$$.next({
                itemsMap: newItemsMap,
                qty: getTotalQty(newItemsMap),
                total: getTotalCost(newItemsMap),
              });
            },
            error: (e) => {
              console.error('Error adding the cart item: ', e);
            },
          });
      }
    }
  }

  removeProduct(itemId: number): void {
    if (itemId >= 0) {
      this.cartObservableLoaderService
        .deleteCartItem(itemId)
        .pipe(take(1))
        .subscribe({
          next: () => {
            const { itemsMap } = this.cart$$.value;
            itemsMap.delete(itemId);
            this.cart$$.next({
              itemsMap,
              qty: getTotalQty(itemsMap),
              total: getTotalCost(itemsMap),
            });
          },
          error: (e) => {
            console.error('Error deleting the cart item: ', e);
          },
        });
    }
  }

  increaseQuantity(productId: number): void {
    this.changeQuantityBy(productId, 1);
  }

  decreaseQuantity(productId: number): void {
    this.changeQuantityBy(productId, -1);
  }

  private changeQuantityBy(productId: number, delta: number): void {
    if (productId >= 0) {
      const { itemsMap } = this.cart$$.value;
      const oldItem = itemsMap.get(productId);
      if (oldItem) {
        const newItem = { ...oldItem, qty: oldItem.qty + delta };
        this.cartObservableLoaderService
          .updateCartItem(newItem)
          .pipe(take(1))
          .subscribe({
            next: (item) => {
              const newItemsMap = itemsMap.set(item.id, item);
              this.cart$$.next({
                itemsMap: newItemsMap,
                qty: getTotalQty(newItemsMap),
                total: getTotalCost(newItemsMap),
              });
            },
            error: (e) => {
              console.error('Error updating quantity for the cart item: ', e);
            },
          });
      }
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
