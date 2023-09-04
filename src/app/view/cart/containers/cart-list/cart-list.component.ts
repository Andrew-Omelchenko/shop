import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { CartItemModel } from '../../../../core/models/cart-item.model';
import { CartContentModel } from '../../../../core/models/cart-content.model';
import { DropdownItemModel } from '../../../../core/models/dropdown-item.model';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit, OnDestroy {
  cart$!: Observable<CartContentModel>;

  activeItem$$: BehaviorSubject<CartItemModel | null> = new BehaviorSubject<CartItemModel | null>(null);

  isFieldDropdownOpen = false;
  selectedFieldOption!: DropdownItemModel<CartItemModel>;
  isAscending = false;

  fieldOptions: DropdownItemModel<CartItemModel>[] = [
    { name: 'Name', value: 'name' },
    { name: 'Price', value: 'price' },
    { name: 'Quantity', value: 'qty' },
  ];

  private onDestroy$$: Subject<void> = new Subject<void>();

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.selectedFieldOption = this.fieldOptions[0];
    this.cart$ = this.cartService.getCartObservable();
    this.cart$.pipe(takeUntil(this.onDestroy$$)).subscribe((cart) => {
      const activeItem = this.activeItem$$.getValue();
      if (activeItem) {
        const found = cart.items.find((item) => item.id === activeItem.id) || null;
        this.activeItem$$.next(found);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$$.next();
    this.onDestroy$$.complete();
  }

  trackById(index: number, item: CartItemModel): number {
    return item.id;
  }

  onSelectFieldOption(value: DropdownItemModel<CartItemModel>): void {
    if (this.selectedFieldOption !== value) {
      this.selectedFieldOption = value;
    }
    this.isFieldDropdownOpen = false;
  }

  onIncreaseQty(): void {
    const activeItem = this.activeItem$$.getValue();
    if (activeItem) {
      this.cartService.increaseQuantity(activeItem.id);
    }
  }

  onDecreaseQty(): void {
    const activeItem = this.activeItem$$.getValue();
    if (activeItem) {
      this.cartService.decreaseQuantity(activeItem.id);
    }
  }

  onDeleteItem(): void {
    const activeItem = this.activeItem$$.getValue();
    if (activeItem) {
      this.cartService.removeProduct(activeItem.id);
    }
  }
}
