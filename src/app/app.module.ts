import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { ProductsModule } from './view/products/products.module';
import { CartModule } from './view/cart/cart.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ClarityModule, ProductsModule, CartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
