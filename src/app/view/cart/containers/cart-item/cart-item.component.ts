import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItemModel } from '../../../../core/models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  @Input()
  item: CartItemModel | undefined | null;

  @Output()
  quantityIncrease: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  quantityDecrease: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  delete: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  back: EventEmitter<void> = new EventEmitter<void>();
}
