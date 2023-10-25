import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ProductModel } from '../../models/product.model';
import { ErrorModel } from '../../models/error.model';

export const productsAdapter = createEntityAdapter<ProductModel>({
  selectId: ({ id }: ProductModel) => id,
});

export interface ProductsStateModel extends EntityState<ProductModel> {
  loading: boolean;
  loaded: boolean;
  error: ErrorModel | null;
}

export const initialProductsState: ProductsStateModel = productsAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});
