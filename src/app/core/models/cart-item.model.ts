import { Category } from './common.types';

export interface CartItemModel {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
  qty: number;
}
