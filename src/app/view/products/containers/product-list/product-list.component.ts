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

  onSelectProduct(productId: number): void {
    this.router.navigate(['products', productId]);
  }
}
