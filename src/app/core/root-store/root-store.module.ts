import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsStoreModule } from './products/products.module';
import { RouterStoreModule } from './router/router.module';

@NgModule({
  declarations: [],
  imports: [
    ProductsStoreModule,
    RouterStoreModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          // strictStateSerializability: true,
          // strictActionSerializability: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
  ],
})
export class RootStoreModule {}
