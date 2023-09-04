import { NgModule } from '@angular/core';
import { ProductListV2Component } from './containers/product-list-v2/product-list-v2.component';
import { ProductV2Component } from './containers/product-v2/product-v2.component';
import { ClrDatagridModule } from '@clr/angular';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProductListV2Component, ProductV2Component],
  imports: [ClrDatagridModule, SharedModule],
})
export class ProductsV2Module {}
