import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-v2',
  templateUrl: './product-v2.component.html',
  styleUrls: ['./product-v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductV2Component {
  @Input()
  product: ProductModel | null = null;

  @Output()
  addToCart: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  back: EventEmitter<void> = new EventEmitter<void>();

  onAddToCart(): void {
    this.addToCart.emit();
  }

  onBack(): void {
    this.back.emit();
  }
}
