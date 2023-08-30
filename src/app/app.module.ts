import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './view/products/products.module';
import { ProductsV2Module } from './view/products-v2/products-v2.module';
import { CartModule } from './view/cart/cart.module';
import { OrdersModule } from './view/orders/orders.module';
import { CONSTANTS_PROVIDER } from './core/services/constants.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    SharedModule,
    ProductsModule,
    ProductsV2Module,
    CartModule,
    OrdersModule,
  ],
  providers: [
    {
      provide: CONSTANTS_PROVIDER,
      useValue: {
        App: 'Shop',
        Ver: '1.0',
        API_URL: 'https://shop-production-api.westus.cloudapp.azure.com',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
