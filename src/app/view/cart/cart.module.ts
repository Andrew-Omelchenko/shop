import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrDatagridModule } from '@clr/angular';
import { CartListComponent } from './containers/cart-list/cart-list.component';
import { CartItemComponent } from './containers/cart-item/cart-item.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CartListComponent, CartItemComponent],
  imports: [CommonModule, ClrDatagridModule, SharedModule],
  exports: [CartListComponent],
})
export class CartModule {}
