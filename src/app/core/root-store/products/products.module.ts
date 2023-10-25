import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { PRODUCTS_FEATURE } from './feature';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './products.effects';
import { productsReducer } from './products.reducer';

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature(PRODUCTS_FEATURE, productsReducer), EffectsModule.forFeature([ProductsEffects])],
})
export class ProductsStoreModule {}
