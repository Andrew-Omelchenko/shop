import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsAdapter, ProductsStateModel } from './products.state';
import { PRODUCTS_FEATURE } from './feature';
import { Dictionary } from '@ngrx/entity';
import { ProductModel } from '../../models/product.model';
import { getRouterParams } from '../router/router.selectors';

export const selectProductsState = createFeatureSelector<ProductsStateModel>(PRODUCTS_FEATURE);

export const {
  selectIds: selectProductIds,
  selectEntities: selectAllProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectProductsTotal,
} = productsAdapter.getSelectors(selectProductsState);

export const selectProductById = (productId: number) =>
  createSelector(selectAllProductEntities, (productsMap: Dictionary<ProductModel>) => productsMap[productId]);

export const selectProductByUrl = createSelector(
  selectAllProductEntities,
  getRouterParams,
  (productsMap, routerParams): ProductModel => {
    return productsMap[routerParams['productId']] as ProductModel;
  },
);
