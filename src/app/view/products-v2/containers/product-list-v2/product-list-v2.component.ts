import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../../core/models/product.model';
import { ProductsLoaderService } from '../../../../core/loaders/products-loader.service';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-product-list-v2',
  templateUrl: './product-list-v2.component.html',
  styleUrls: ['./product-list-v2.component.scss'],
})
export class ProductListV2Component implements OnInit {
  productList!: ProductModel[];

  activeProduct: ProductModel | undefined = undefined;

  constructor(
    private productsLoader: ProductsLoaderService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.productList = this.productsLoader.getProducts();
  }

  trackById(index: number, product: ProductModel): number {
    return product.id;
  }

  onSelectProduct(product: ProductModel): void {
    this.activeProduct = product;
  }

  onAddToCart(): void {
    if (this.activeProduct) {
      console.log(`Product with id of ${this.activeProduct?.id} has been added to shopping cart!`);
      this.cartService.addItem(this.activeProduct);
      this.activeProduct = undefined;
    }
  }

  onBack(): void {
    this.activeProduct = undefined;
  }
}
