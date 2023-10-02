import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './containers/login/login.component';
import { ClrCheckboxModule, ClrInputModule, ClrPasswordModule, ClrSelectModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, ClrInputModule, ClrPasswordModule, ClrCheckboxModule, ReactiveFormsModule, ClrSelectModule],
})
export class LoginModule {}
