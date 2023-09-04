import { Pipe, PipeTransform } from '@angular/core';
import { CartItemModel } from '../../core/models/cart-item.model';

@Pipe({
  name: 'orderBy',
  pure: false,
})
export class OrderByPipe implements PipeTransform {
  transform(value: CartItemModel[], key: keyof CartItemModel, isAsc = false): CartItemModel[] {
    const type = value?.length ? typeof value[0][key] : 'undefined';
    if (type === 'number' || type === 'string') {
      let compareFn: (a: CartItemModel, b: CartItemModel) => number;
      switch (type) {
        case 'number':
          compareFn = (a, b) => (isAsc ? <number>a[key] - <number>b[key] : <number>b[key] - <number>a[key]);
          break;
        case 'string':
          compareFn = (a, b) =>
            isAsc
              ? (a[key] as string).localeCompare(b[key] as string)
              : (b[key] as string).localeCompare(a[key] as string);
          break;
        default:
        // TODO: other cases
      }
      return [...value].sort((a, b): number => compareFn(a, b));
    }
    // return unchanged array otherwise
    return value;
  }
}
