import { Component, OnInit } from '@angular/core';
import { ProductsLoaderService } from '../../../../core/loaders/products-loader.service';
import { ProductModel } from '../../../../core/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList!: ProductModel[];

  constructor(
    private readonly router: Router,
    private productsLoader: ProductsLoaderService,
  ) {}

  ngOnInit(): void {
    this.productList = this.productsLoader.getProducts();
  }

  trackById(index: number, product: ProductModel): number {
    return product.id;
  }

  // this.router.navigate(['products', productId]); возвращает Promise
  // но вы этот промис никак не используете.
  // В таком случае, возможно, не надо создавать асинхронный метод?
  async onSelectProduct(productId: number): Promise<void> {
    await this.router.navigate(['products', productId]);
  }
}
