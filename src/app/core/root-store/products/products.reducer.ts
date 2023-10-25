import { Action, createReducer, on } from '@ngrx/store';
import { initialProductsState, productsAdapter, ProductsStateModel } from './products.state';
import {
  createProductAction,
  createProductActionFailed,
  createProductActionSuccess,
  deleteProductAction,
  deleteProductActionFailed,
  deleteProductActionSuccess,
  loadProductAction,
  loadProductActionFailed,
  loadProductActionSuccess,
  loadProductsAction,
  loadProductsActionFailed,
  loadProductsActionSuccess,
  updateProductAction,
  updateProductActionFailed,
  updateProductActionSuccess,
} from './products.actions';

const reducer = createReducer(
  initialProductsState,

  on(
    loadProductsAction,
    loadProductAction,
    updateProductAction,
    createProductAction,
    deleteProductAction,
    (state): ProductsStateModel => ({
      ...state,
      loading: true,
    }),
  ),

  on(loadProductsActionSuccess, (state, { products }) =>
    productsAdapter.setAll(products, {
      ...state,
      loading: false,
      loaded: true,
      error: null,
    }),
  ),

  on(loadProductActionSuccess, createProductActionSuccess, (state, { product }) =>
    productsAdapter.upsertOne(product, {
      ...state,
      loading: false,
      loaded: true,
      error: null,
    }),
  ),

  on(updateProductActionSuccess, (state, { update }) =>
    productsAdapter.updateOne(update, {
      ...state,
      loading: false,
      loaded: true,
      error: null,
    }),
  ),

  on(deleteProductActionSuccess, (state, { productId }) =>
    productsAdapter.removeOne(productId, {
      ...state,
      loading: false,
      loaded: true,
      error: null,
    }),
  ),

  on(
    loadProductsActionFailed,
    loadProductActionFailed,
    updateProductActionFailed,
    createProductActionFailed,
    deleteProductActionFailed,
    (state, { error }): ProductsStateModel => ({
      ...state,
      error,
      loading: false,
    }),
  ),
);

export function productsReducer(state: ProductsStateModel | undefined, action: Action) {
  return reducer(state, action);
}
