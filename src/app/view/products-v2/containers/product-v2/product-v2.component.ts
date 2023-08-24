import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-v2',
  templateUrl: './product-v2.component.html',
  styleUrls: ['./product-v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductV2Component {
  // Из-за того, что тут тип ProductModel | undefined, то в шаблоне придется писать
  // product?.title, product?.description и т.д.
  // Чтобы этого избежать, можно поставить в конце !, тогда в шаблоне можно будет писать
  // product.title, product.description и т.д.
  @Input()
  product: ProductModel | undefined;

  @Output()
  addToCart: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  back: EventEmitter<void> = new EventEmitter<void>();

  onAddToCart(): void {
    this.addToCart.next();
  }

  // Метод next это метод Subject, который является базовым класом для EventEmmitter
  // У EventEmmitter есть метод emit, который делает тоже самое
  onBack(): void {
    this.back.next();
  }
}
