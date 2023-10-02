import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, take } from 'rxjs';
import { ProductsLoaderService } from '../../../../core/loaders/products-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../core/models/common.types';
import { EMPTY_PRODUCT } from '../../../../core/resolvers/product.resolver';

@Component({
  selector: 'app-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit {
  public productForm!: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly productsLoaderService: ProductsLoaderService,
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        filter((data) => !!data),
        take(1),
      )
      .subscribe(({ product }) => {
        const { id, name, description, price, category, isAvailable } = product || EMPTY_PRODUCT;
        this.productForm = new FormGroup({
          id: new FormControl<number>(id),
          name: new FormControl<string>(name, Validators.required),
          description: new FormControl<string>(description),
          price: new FormControl<number>(price, [Validators.required, Validators.pattern(/^[1-9]\d*(\.?\d+)*$/)]),
          category: new FormControl<Category>(category, Validators.required),
          isAvailable: new FormControl<boolean>(isAvailable, Validators.required),
        });
      });
  }

  onSaveProduct(): void {
    this.productsLoaderService.saveProduct(this.productForm.value);
    this.router.navigate(['admin', 'products']);
  }

  onGoBack(): void {
    this.router.navigate(['admin', 'products']);
  }
}
