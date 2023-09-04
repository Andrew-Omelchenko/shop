import { NgModule } from '@angular/core';
import { ClrDatagridModule } from '@clr/angular';
import { CartListComponent } from './containers/cart-list/cart-list.component';
import { CartItemComponent } from './containers/cart-item/cart-item.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CartListComponent, CartItemComponent],
  imports: [ClrDatagridModule, SharedModule],
  exports: [CartListComponent],
})
export class CartModule {}
