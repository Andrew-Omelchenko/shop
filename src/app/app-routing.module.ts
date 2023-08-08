import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './view/products/containers/product-list/product-list.component';
import { ProductComponent } from './view/products/containers/product/product.component';
import { PageNotFoundComponent } from './view/page-not-found/containers/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    children: [
      { path: '', component: ProductListComponent },
      { path: ':productId', component: ProductComponent },
    ],
  },
  // в чем смысл этого роута? ведь можно написать один объект.
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
