import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { CartItemModel } from '../../../../core/models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  itemsList$!: Observable<CartItemModel[]>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.itemsList$ = this.cartService.getItemsObs();
  }

  trackById(index: number, item: CartItemModel): number {
    return item.id;
  }
}
