import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { CartItemModel } from '../../../../core/models/cart-item.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  itemsList$!: Observable<CartItemModel[]>;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.itemsList$ = this.cartService.getItemsObs();
  }

  trackById(index: number, item: CartItemModel): number {
    return item.id;
  }
}
