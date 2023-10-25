import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../../models/product.model';
import { ErrorModel } from '../../models/error.model';
import { Update } from '@ngrx/entity';

export const loadProductsAction = createAction('[Products] Load products');
export const loadProductsActionSuccess = createAction(
  '[Products] Load products success',
  props<{ products: ProductModel[] }>(),
);
export const loadProductsActionFailed = createAction('[Products] Load products failed', props<{ error: ErrorModel }>());

export const loadProductAction = createAction('[Product] Load product', props<{ productId: number }>());
export const loadProductActionSuccess = createAction(
  '[Product] Load product success',
  props<{ product: ProductModel }>(),
);
export const loadProductActionFailed = createAction('[Product] Load product failed', props<{ error: ErrorModel }>());

export const updateProductAction = createAction('[Product] Update product', props<{ update: Update<ProductModel> }>());
export const updateProductActionSuccess = createAction(
  '[Product] Update product success',
  props<{ update: Update<ProductModel> }>(),
);
export const updateProductActionFailed = createAction(
  '[Product] Update product failed',
  props<{ error: ErrorModel }>(),
);

export const createProductAction = createAction('[Product] Create product', props<{ product: ProductModel }>());
export const createProductActionSuccess = createAction(
  '[Product] Create product success',
  props<{ product: ProductModel }>(),
);
export const createProductActionFailed = createAction(
  '[Product] Create product failed',
  props<{ error: ErrorModel }>(),
);

export const deleteProductAction = createAction('[Product] Delete product', props<{ productId: number }>());
export const deleteProductActionSuccess = createAction(
  '[Product] Delete product success',
  props<{ productId: number }>(),
);
export const deleteProductActionFailed = createAction(
  '[Product] Delete product failed',
  props<{ error: ErrorModel }>(),
);
