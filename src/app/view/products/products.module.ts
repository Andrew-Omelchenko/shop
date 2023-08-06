import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductComponent } from './containers/product/product.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [ProductListComponent, ProductComponent],
  imports: [CommonModule, ClarityModule],
})
export class ProductsModule {}
