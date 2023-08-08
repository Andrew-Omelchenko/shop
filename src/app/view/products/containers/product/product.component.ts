import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsLoaderService } from '../../../../core/loaders/products-loader.service';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../../../core/models/product.model';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  // модификатор public не нужен
  public product: ProductModel | undefined;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private productsLoader: ProductsLoaderService,
    private cartService: CartService,
  ) {}

  public ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.onDestroy$),
        map((params) => params?.['productId']),
        distinctUntilChanged(),
      )
      .subscribe((productId) => {
        const id = Number(productId);
        this.product = Number.isInteger(id) ? this.productsLoader.getProductById(id) : undefined;
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onAddToCart(product: ProductModel | undefined): void {
    if (!product) return;
    console.log(`Product with id of ${product.id} has been added to shopping cart!`);
    this.cartService.addItem(product);
  }

  public async onBackToProducts(): Promise<void> {
    await this.router.navigate(['products']);
  }
}
