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
  public productList!: ProductModel[];
  constructor(
    private readonly router: Router,
    private productsLoader: ProductsLoaderService,
  ) {}

  public ngOnInit(): void {
    this.productList = this.productsLoader.getProducts();
  }

  public trackById(index: number, product: ProductModel): number {
    return product.id;
  }

  public async onSelectProduct(productId: number): Promise<void> {
    await this.router.navigate(['products', productId]);
  }
}
