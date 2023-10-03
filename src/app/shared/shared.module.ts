import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { FgColorDirective } from './directives/fg-color.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './page/layout/layout.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ClrIconModule } from '@clr/angular';

@NgModule({
  declarations: [HighlightDirective, FgColorDirective, OrderByPipe, LayoutComponent],
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, ClrIconModule],
  exports: [CommonModule, FormsModule, HighlightDirective, FgColorDirective, OrderByPipe, LayoutComponent],
})
export class SharedModule {}
