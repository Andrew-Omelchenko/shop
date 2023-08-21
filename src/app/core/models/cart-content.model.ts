import { CartItemModel } from './cart-item.model';

export interface CartContentModel {
  items: CartItemModel[];
  qty: number;
  total: number;
}
