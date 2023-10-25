import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../core/models/product.model';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../../../../core/root-store/products/products.selectors';
import { goAction } from '../../../../core/root-store/router/router.actions';

@Component({
  selector: 'app-product-list-v2',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList$!: Observable<ProductModel[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.productList$ = this.store.select(selectAllProducts);
  }

  trackById(index: number, product: ProductModel): number {
    return product?.id;
  }

  onSelectProduct(product: ProductModel): void {
    this.store.dispatch(goAction({ path: ['product', product?.id] }));
  }
}
