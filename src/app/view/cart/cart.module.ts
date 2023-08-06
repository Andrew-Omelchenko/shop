import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './containers/cart/cart.component';
import { ClrDatagridModule } from '@clr/angular';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, ClrDatagridModule],
  exports: [CartComponent],
})
export class CartModule {}
