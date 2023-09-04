import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { FgColorDirective } from './directives/fg-color.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HighlightDirective, FgColorDirective, OrderByPipe],
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule, HighlightDirective, FgColorDirective, OrderByPipe],
})
export class SharedModule {}
