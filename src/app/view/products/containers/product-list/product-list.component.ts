import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../core/models/product.model';
import { ProductsLoaderService } from '../../../../core/loaders/products-loader.service';

@Component({
  selector: 'app-product-list-v2',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList$!: Observable<ProductModel[]>;

  constructor(
    private readonly router: Router,
    private readonly productsLoader: ProductsLoaderService,
  ) {}

  ngOnInit(): void {
    this.productList$ = this.productsLoader.getProducts();
  }

  trackById(index: number, product: ProductModel): number {
    return product?.id;
  }

  onSelectProduct(product: ProductModel): void {
    this.router.navigate(['product', product?.id]);
  }
}
