import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrDatagridModule } from '@clr/angular';
import { CartListComponent } from './containers/cart-list/cart-list.component';

@NgModule({
  declarations: [CartListComponent],
  imports: [CommonModule, ClrDatagridModule],
  exports: [CartListComponent],
})
export class CartModule {}
