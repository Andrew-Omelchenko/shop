import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../core/models/product.model';
import { Router } from '@angular/router';
import { ProductsLoaderService } from '../../../../core/loaders/products-loader.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productList$!: Observable<ProductModel[]>;

  constructor(
    private readonly router: Router,
    private readonly productsLoader: ProductsLoaderService,
  ) {}

  ngOnInit(): void {
    this.productList$ = this.productsLoader.getProductsObs();
  }

  trackById(index: number, product: ProductModel): number {
    return product.id;
  }

  onSelectProduct(product: ProductModel): void {
    this.router.navigate(['admin', 'products', 'edit', product.id]);
  }
}
