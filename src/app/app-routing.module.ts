import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './view/page-not-found/containers/page-not-found/page-not-found.component';
import { ProductListV2Component } from './view/products-v2/containers/product-list-v2/product-list-v2.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    children: [
      { path: '', component: ProductListV2Component },
      // { path: '', component: ProductListComponent },
      // { path: ':productId', component: ProductComponent },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
