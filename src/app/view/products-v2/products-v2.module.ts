import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListV2Component } from './containers/product-list-v2/product-list-v2.component';
import { ProductV2Component } from './containers/product-v2/product-v2.component';
import { ClrDatagridModule } from '@clr/angular';

@NgModule({
  declarations: [ProductListV2Component, ProductV2Component],
  imports: [CommonModule, ClrDatagridModule],
})
export class ProductsV2Module {}
