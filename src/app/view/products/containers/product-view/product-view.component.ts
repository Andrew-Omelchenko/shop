import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { ProductsLoaderService } from '../../../../core/loaders/products-loader.service';
import { ProductModel } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-v2',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit, OnDestroy {
  public product!: ProductModel | undefined;

  private onDestroy$$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly productsLoaderService: ProductsLoaderService,
    private readonly cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.onDestroy$$),
        map((params) => params?.['productId']),
        distinctUntilChanged(),
      )
      .subscribe((productId) => {
        const id = Number(productId);
        this.product = Number.isInteger(id) ? this.productsLoaderService.getProductById(id) : undefined;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$$.next();
    this.onDestroy$$.complete();
  }

  onAddToCart(product: ProductModel): void {
    this.cartService.addProduct(product);
    this.router.navigate(['/products-list']);
  }

  onBack(): void {
    this.router.navigate(['/products-list']);
  }
}
