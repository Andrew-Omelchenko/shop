import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { CartItemModel } from '../../../../core/models/cart-item.model';
import { CartContentModel } from '../../../../core/models/cart-content.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit, OnDestroy {
  cart$!: Observable<CartContentModel>;

  activeItem$: BehaviorSubject<CartItemModel | undefined> = new BehaviorSubject<CartItemModel | undefined>(undefined);

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getCartObservable();
    this.cart$.pipe(takeUntil(this.onDestroy$)).subscribe((cart) => {
      const activeItem = this.activeItem$.getValue();
      if (activeItem) {
        const found = cart.items.find((item) => item.id === activeItem.id);
        this.activeItem$.next(found);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  trackById(index: number, item: CartItemModel): number {
    return item.id;
  }

  onIncreaseQty(): void {
    const activeItem = this.activeItem$.getValue();
    if (activeItem) {
      this.cartService.updateQty(activeItem.id, activeItem.qty + 1);
    }
  }

  onDecreaseQty(): void {
    const activeItem = this.activeItem$.getValue();
    if (activeItem) {
      this.cartService.updateQty(activeItem.id, activeItem.qty - 1);
    }
  }

  onDeleteItem(): void {
    const activeItem = this.activeItem$.getValue();
    if (activeItem) {
      this.cartService.deleteItem(activeItem.id);
    }
  }
}
