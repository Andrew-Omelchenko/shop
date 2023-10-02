import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductViewComponent } from './containers/product-view/product-view.component';

const routes: Routes = [
  {
    path: 'products-list',
    component: ProductListComponent,
    title: 'List of products',
  },
  {
    path: 'product/:productId',
    component: ProductViewComponent,
    title: 'Product view',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
