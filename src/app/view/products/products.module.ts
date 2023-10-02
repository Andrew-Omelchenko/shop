import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ClrDatagridModule } from '@clr/angular';
import { SharedModule } from '../../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductViewComponent } from './containers/product-view/product-view.component';

@NgModule({
  declarations: [ProductListComponent, ProductViewComponent],
  imports: [ClrDatagridModule, SharedModule, RouterOutlet, ProductsRoutingModule],
  exports: [RouterModule],
})
export class ProductsModule {}
