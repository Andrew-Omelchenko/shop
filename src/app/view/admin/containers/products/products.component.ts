import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../../core/models/product.model';
import { Router } from '@angular/router';
import { ProductsPromiseLoaderService } from '../../../../core/loaders/products-promise-loader.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productList$!: Promise<ProductModel[]>;

  constructor(
    private readonly router: Router,
    private readonly productsLoader: ProductsPromiseLoaderService,
  ) {}

  ngOnInit(): void {
    this.productList$ = this.productsLoader.getProducts();
  }

  trackById(index: number, product: ProductModel): number {
    return product.id;
  }

  onSelectProduct(product: ProductModel): void {
    this.router.navigate(['admin', 'products', 'edit', product.id]);
  }
}
