import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { CartItemModel } from '../../../../core/models/cart-item.model';
import { CartContentModel } from '../../../../core/models/cart-content.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  cart$!: Observable<CartContentModel>;

  activeItem: CartItemModel | undefined = undefined;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getCartObservable();
  }

  trackById(index: number, item: CartItemModel): number {
    return item.id;
  }

  onIncreaseQty(): void {
    if (this.activeItem) {
      this.cartService.changeQtyBy(this.activeItem.id, 1);
      this.activeItem = undefined;
    }
  }

  onDecreaseQty(): void {
    if (this.activeItem) {
      this.cartService.changeQtyBy(this.activeItem.id, -1);
      this.activeItem = undefined;
    }
  }

  onDeleteItem(): void {
    if (this.activeItem) {
      this.cartService.deleteItem(this.activeItem.id);
      this.activeItem = undefined;
    }
  }
}
