import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { Category } from '../models/common.types';
import { IdGenerator } from '../utils/id-generator';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsLoaderService {
  private static idGenerator = IdGenerator();

  private readonly initialList: ProductModel[] = [
    {
      id: ProductsLoaderService.idGenerator.next().value,
      name: 'Product #1',
      description: 'Product #1 description',
      price: 1.21,
      category: Category.Convenience,
      isAvailable: true,
    },
    {
      id: ProductsLoaderService.idGenerator.next().value,
      name: 'Product #2',
      description: 'Product #2 description',
      price: 10.42,
      category: Category.Convenience,
      isAvailable: true,
    },
    {
      id: ProductsLoaderService.idGenerator.next().value,
      name: 'Product #3',
      description: 'Product #3 description',
      price: 2.84,
      category: Category.Unsought,
      isAvailable: false,
    },
    {
      id: ProductsLoaderService.idGenerator.next().value,
      name: 'Product #4',
      description: 'Product #4 description',
      price: 43.21,
      category: Category.Convenience,
      isAvailable: true,
    },
    {
      id: ProductsLoaderService.idGenerator.next().value,
      name: 'Product #5',
      description: 'Product #5 description',
      price: 21.63,
      category: Category.Shopping,
      isAvailable: false,
    },
    {
      id: ProductsLoaderService.idGenerator.next().value,
      name: 'Product #6',
      description: 'Product #6 description',
      price: 151.1,
      category: Category.Specialty,
      isAvailable: true,
    },
  ];

  private products$$: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([...this.initialList]);

  getProductsObs(): Observable<ProductModel[]> {
    return this.products$$.asObservable();
  }

  getProductById(productId: number): ProductModel | undefined {
    return this.products$$.getValue().find((product) => product?.id === productId);
  }

  saveProduct(product: ProductModel): void {
    if (product.id === 0) {
      this.products$$.next([
        ...this.products$$.getValue(),
        { ...product, id: ProductsLoaderService.idGenerator.next().value },
      ]);
      return;
    }
    const index = this.products$$.getValue().findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const newList = [...this.products$$.getValue()];
      newList[index] = product;
      this.products$$.next(newList);
    }
  }
}
