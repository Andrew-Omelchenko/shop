import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './view/products/products.module';
import { CartModule } from './view/cart/cart.module';
import { OrdersModule } from './view/orders/orders.module';
import { CONSTANTS_PROVIDER } from './core/services/constants.service';
import { GeneratedString, GeneratorFactory } from './core/services/generator.factory';
import { GeneratorService } from './core/services/generator.service';
import { FirstComponent } from './view/first/first.component';
import { LoginModule } from './view/login/login.module';
import { PageForbiddenComponent } from './view/page-forbidden/page-forbidden.component';
import { ProcessOrderComponent } from './view/process-order/process-order.component';
import { TitleStrategy } from '@angular/router';
import { PageTitleStrategyService } from './core/services/page-title-strategy.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { httpInterceptorProviders } from './core/interceptors/const';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreModule } from './core/root-store/root-store.module';

@NgModule({
  declarations: [AppComponent, PageForbiddenComponent, ProcessOrderComponent],
  imports: [
    BrowserModule,
    ClarityModule,
    SharedModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    LoginModule,
    FirstComponent,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    RootStoreModule,
    // MUST BE LAST
    AppRoutingModule,
  ],
  providers: [
    { provide: TitleStrategy, useClass: PageTitleStrategyService },
    {
      provide: CONSTANTS_PROVIDER,
      useValue: {
        App: 'Shop',
        Ver: '1.0',
        API_URL: 'http://localhost:3000',
      },
    },
    { provide: GeneratedString, useFactory: GeneratorFactory(6), deps: [GeneratorService] },
    provideHttpClient(withInterceptorsFromDi()),
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
