import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuard } from '../../core/guards/admin-auth-guard';
import { ProductsComponent } from './containers/products/products.component';
import { AddEditProductComponent } from './containers/add-edit-product/add-edit-product.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { AdminComponent } from './containers/admin/admin.component';
import { productResolver } from '../../core/resolvers/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    title: 'Admin',
    canActivate: [adminAuthGuard],
    children: [
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Full products list',
      },
      {
        path: 'products/add',
        component: AddEditProductComponent,
        title: 'Add new product',
        resolve: {
          product: productResolver,
        },
      },
      {
        path: 'products/edit/:id',
        component: AddEditProductComponent,
        title: 'Edit product',
        resolve: {
          product: productResolver,
        },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        title: 'Orders',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
