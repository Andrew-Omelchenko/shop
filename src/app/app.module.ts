import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { ProductsModule } from './view/products/products.module';
import { CartModule } from './view/cart/cart.module';
import { HostDirectiveTestComponent, TestComponent } from './view/host-directive-test/host-directive-test.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    ProductsModule,
    CartModule,
    TestComponent,
    HostDirectiveTestComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
