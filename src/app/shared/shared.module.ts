import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { FgColorDirective } from './directives/fg-color.directive';

@NgModule({
  declarations: [HighlightDirective, FgColorDirective],
  imports: [CommonModule],
  exports: [HighlightDirective, FgColorDirective],
})
export class SharedModule {}
