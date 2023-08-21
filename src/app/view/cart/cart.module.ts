import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrDatagridModule } from '@clr/angular';
import { CartListComponent } from './containers/cart-list/cart-list.component';
import { CartItemComponent } from './containers/cart-item/cart-item.component';

@NgModule({
  declarations: [CartListComponent, CartItemComponent],
  imports: [CommonModule, ClrDatagridModule],
  exports: [CartListComponent],
})
export class CartModule {}
