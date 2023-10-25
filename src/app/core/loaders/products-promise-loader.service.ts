import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DEFAULT_ATTEMPTS_NUMBER } from '../config/config';
import { ProductModel } from '../models/product.model';
import { catchError, firstValueFrom, of, retry } from 'rxjs';
import { Constants, CONSTANTS_PROVIDER } from '../services/constants.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsPromiseLoaderService {
  private readonly attempts = DEFAULT_ATTEMPTS_NUMBER;
  private baseProductsApiUrl!: string;

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(CONSTANTS_PROVIDER) private readonly constants: Constants,
  ) {
    this.baseProductsApiUrl = `${constants.API_URL}/products`;
  }

  getProducts(): Promise<ProductModel[]> {
    const request$ = this.httpClient.get<ProductModel[]>(this.baseProductsApiUrl).pipe(
      retry(this.attempts),
      catchError((e) => {
        console.log('Error loading products: ', e);
        return of([]);
      }),
    );
    return firstValueFrom(request$);
  }

  getProductById(productId: NonNullable<ProductModel['id']>): Promise<ProductModel | null> {
    const request$ = this.httpClient.get<ProductModel>(`${this.baseProductsApiUrl}/${productId}`).pipe(
      retry(this.attempts),
      catchError((e) => {
        console.log('Error loading the product: ', e);
        return of(null);
      }),
    );
    return firstValueFrom(request$);
  }

  saveProduct(updates: Partial<ProductModel>): Promise<ProductModel | null> {
    if (updates.id === 0) {
      return this.createProduct(updates as ProductModel);
    }

    const request$ = this.httpClient.put<ProductModel>(`${this.baseProductsApiUrl}/${updates.id}`, updates).pipe(
      retry(this.attempts),
      catchError((e) => {
        console.log('Error saving the product: ', e);
        return of(null);
      }),
    );
    return firstValueFrom(request$);
  }

  createProduct(product: ProductModel): Promise<ProductModel | null> {
    const request$ = this.httpClient.post<ProductModel>(this.baseProductsApiUrl, product).pipe(
      retry(this.attempts),
      catchError((e) => {
        console.log('Error creating the product: ', e);
        return of(null);
      }),
    );
    return firstValueFrom(request$);
  }

  deleteProduct(product: ProductModel): Promise<unknown> {
    const request$ = this.httpClient.delete(`${this.baseProductsApiUrl}/${product.id}`).pipe(
      retry(this.attempts),
      catchError((e) => {
        console.log('Error deleting the product: ', e);
        return of(null);
      }),
    );
    return firstValueFrom(request$);
  }
}
