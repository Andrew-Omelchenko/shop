import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './view/page-not-found/containers/page-not-found/page-not-found.component';
import { CartListComponent } from './view/cart/containers/cart-list/cart-list.component';
import { LoginComponent } from './view/login/containers/login/login.component';
import { PageForbiddenComponent } from './view/page-forbidden/page-forbidden.component';
import { ProcessOrderComponent } from './view/process-order/process-order.component';
import { cartNotEmptyGuard } from './core/guards/cart-not-empty.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products-list',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'cart',
    component: CartListComponent,
    title: 'Cart',
  },
  {
    path: 'order',
    component: ProcessOrderComponent,
    canActivate: [cartNotEmptyGuard],
    title: 'Order',
  },
  {
    path: 'admin',
    loadChildren: () => import('./view/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'forbidden',
    component: PageForbiddenComponent,
    title: 'Forbidden',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page not found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
