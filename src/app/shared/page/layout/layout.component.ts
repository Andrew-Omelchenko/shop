import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public qtyInCart$!: Observable<number>;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.qtyInCart$ = this.cartService.getCartObservable().pipe(map(({ qty }) => qty));
  }
}
