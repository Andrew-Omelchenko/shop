import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
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
import { ProductsPromiseLoaderService } from '../../loaders/products-promise-loader.service';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { ProductModel } from '../../models/product.model';

@Injectable()
export class ProductsEffects implements OnInitEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productsLoader: ProductsPromiseLoaderService,
  ) {}

  public loadingProducts$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProductsAction),
      switchMap(() =>
        fromPromise(this.productsLoader.getProducts()).pipe(
          map((products: ProductModel[]) => loadProductsActionSuccess({ products })),
          catchError((err) => of(loadProductsActionFailed({ error: err }))),
        ),
      ),
    );
  });

  public loadingProduct$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProductAction),
      switchMap(({ productId }) =>
        fromPromise(this.productsLoader.getProductById(productId)).pipe(
          map((product: ProductModel) => loadProductActionSuccess({ product })),
          catchError((err) => of(loadProductActionFailed({ error: err }))),
        ),
      ),
    );
  });

  public updateProduct$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProductAction),
      switchMap(({ update }) =>
        fromPromise(this.productsLoader.saveProduct(update)).pipe(
          map(() => updateProductActionSuccess({ update })),
          catchError((err) => of(updateProductActionFailed({ error: err }))),
        ),
      ),
    );
  });

  public createProduct$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(createProductAction),
      switchMap(({ product }) =>
        fromPromise(this.productsLoader.createProduct(product)).pipe(
          map((result) => createProductActionSuccess({ product: result })),
          catchError((err) => of(createProductActionFailed({ error: err }))),
        ),
      ),
    );
  });

  public deleteProduct$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteProductAction),
      switchMap(({ productId }) =>
        fromPromise(this.productsLoader.deleteProduct(productId)).pipe(
          map(() => deleteProductActionSuccess({ productId })),
          catchError((err) => of(deleteProductActionFailed({ error: err }))),
        ),
      ),
    );
  });

  public ngrxOnInitEffects(): Action {
    return loadProductsAction();
  }
}
