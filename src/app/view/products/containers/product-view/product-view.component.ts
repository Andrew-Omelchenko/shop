import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { ProductModel } from '../../../../core/models/product.model';
import { Store } from '@ngrx/store';
import { selectProductByUrl } from '../../../../core/root-store/products/products.selectors';
import { goAction, goBackByLocationAction } from '../../../../core/root-store/router/router.actions';

@Component({
  selector: 'app-product-v2',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  public product$!: Observable<ProductModel | undefined>;

  constructor(
    private readonly store: Store,
    private readonly cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.product$ = this.store.select(selectProductByUrl);
  }

  onAddToCart(product: ProductModel): void {
    this.cartService.addProduct(product);
    this.store.dispatch(goAction({ path: ['products-list'] }));
    // this.store.dispatch(goBackByLocationAction());
  }

  onBack(): void {
    // this.store.dispatch(goAction({ path: ['products-list'] }));
    this.store.dispatch(goBackByLocationAction());
  }
}
