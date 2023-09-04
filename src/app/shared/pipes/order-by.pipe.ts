import { Pipe, PipeTransform } from '@angular/core';
import { CartItemModel } from '../../core/models/cart-item.model';

@Pipe({
  name: 'orderBy',
  pure: false,
})
export class OrderByPipe implements PipeTransform {
  transform(value: CartItemModel[], key: keyof CartItemModel, isAsc = false): CartItemModel[] {
    return [...value].sort((a, b): number => {
      let result: number;
      switch (typeof a[key]) {
        case 'number':
          result = <number>a[key] - <number>b[key];
          break;
        case 'string':
          result = (a[key] as string).localeCompare(b[key] as string);
          break;
        default:
          result = 0;
      }
      // returns 0 if types don't match the processing logic implemented
      return isAsc ? result : -result;
    });
  }
}
