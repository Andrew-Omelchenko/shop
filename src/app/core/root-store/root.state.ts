import { PRODUCTS_FEATURE } from './products/feature';
import { ROUTER_FEATURE } from './router/feature';
import { ProductsStateModel } from './products/products.state';
import { RouterStateModel } from './router/router.module';

export interface RootStateModel {
  [PRODUCTS_FEATURE]: ProductsStateModel;
  [ROUTER_FEATURE]: RouterStateModel;
}
