import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DEFAULT_ATTEMPTS_NUMBER } from '../config/config';
import { ProductModel } from '../models/product.model';
import { firstValueFrom, retry } from 'rxjs';
import { Constants, CONSTANTS_PROVIDER } from '../services/constants.service';
import { Update } from '@ngrx/entity';

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
    const request$ = this.httpClient.get<ProductModel[]>(this.baseProductsApiUrl).pipe(retry(this.attempts));
    return firstValueFrom(request$);
  }

  getProductById(productId: NonNullable<ProductModel['id']>): Promise<ProductModel> {
    const request$ = this.httpClient
      .get<ProductModel>(`${this.baseProductsApiUrl}/${productId}`)
      .pipe(retry(this.attempts));
    return firstValueFrom(request$);
  }

  saveProduct(update: Update<ProductModel>): Promise<ProductModel> {
    const request$ = this.httpClient
      .put<ProductModel>(`${this.baseProductsApiUrl}/${update.id}`, update.changes)
      .pipe(retry(this.attempts));
    return firstValueFrom(request$);
  }

  createProduct(product: ProductModel): Promise<ProductModel> {
    const request$ = this.httpClient.post<ProductModel>(this.baseProductsApiUrl, product).pipe(retry(this.attempts));
    return firstValueFrom(request$);
  }

  deleteProduct(productId: number): Promise<unknown> {
    const request$ = this.httpClient.delete(`${this.baseProductsApiUrl}/${productId}`).pipe(retry(this.attempts));
    return firstValueFrom(request$);
  }
}
