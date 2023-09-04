import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../../core/models/product.model';

@Pipe({
  name: 'orderBy',
  pure: false,
})
export class OrderByPipe implements PipeTransform {
  transform(value: ProductModel[], key: keyof ProductModel, isAsc = false): ProductModel[] {
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
