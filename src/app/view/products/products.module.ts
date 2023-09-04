import { NgModule } from '@angular/core';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductComponent } from './containers/product/product.component';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProductListComponent, ProductComponent],
  imports: [ClarityModule, SharedModule],
})
export class ProductsModule {}
