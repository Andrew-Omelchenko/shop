import { NgModule } from '@angular/core';
import { AddEditProductComponent } from './containers/add-edit-product/add-edit-product.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { ProductsComponent } from './containers/products/products.component';
import { AdminComponent } from './containers/admin/admin.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ClrCheckboxModule, ClrDatagridModule, ClrInputModule, ClrVerticalNavModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddEditProductComponent, OrdersComponent, ProductsComponent, AdminComponent],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ClrVerticalNavModule,
    ClrDatagridModule,
    ReactiveFormsModule,
    ClrInputModule,
    ClrCheckboxModule,
  ],
  exports: [AdminRoutingModule],
})
export class AdminModule {}
