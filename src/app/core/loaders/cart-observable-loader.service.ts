import { Inject, Injectable } from '@angular/core';
import { DEFAULT_ATTEMPTS_NUMBER } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { CartItemModel } from '../models/cart-item.model';
import { ProductModel } from '../models/product.model';
import { Constants, CONSTANTS_PROVIDER } from '../services/constants.service';

@Injectable({
  providedIn: 'root',
})
export class CartObservableLoaderService {
  // ок, но если вы хотите использовать константы, то у нас уже есть сервис констант ниже
  // можно туда что-то добавить
  private readonly attempts = DEFAULT_ATTEMPTS_NUMBER;
  private baseCartApiUrl!: string;

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(CONSTANTS_PROVIDER) private readonly constants: Constants,
  ) {
    this.baseCartApiUrl = `${constants.API_URL}/cart`;
  }

  getCartItems(): Observable<CartItemModel[]> {
    return this.httpClient.get<CartItemModel[]>(this.baseCartApiUrl).pipe(retry(this.attempts));
  }

  updateCartItem(cartItem: Partial<CartItemModel>): Observable<CartItemModel> {
    return this.httpClient
      .put<CartItemModel>(`${this.baseCartApiUrl}/${cartItem.id}`, cartItem)
      .pipe(retry(this.attempts));
  }

  createCartItem(cartItem: CartItemModel): Observable<CartItemModel> {
    return this.httpClient.post<CartItemModel>(this.baseCartApiUrl, cartItem).pipe(retry(this.attempts));
  }

  deleteCartItem(id: NonNullable<ProductModel['id']>): Observable<unknown> {
    return this.httpClient.delete(`${this.baseCartApiUrl}/${id}`).pipe(retry(this.attempts));
  }
}
