import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.backgroundColor = 'yellow';
    this.cursor = 'pointer';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.backgroundColor = 'white';
    this.cursor = 'auto';
  }

  @HostBinding('style.backgroundColor') backgroundColor = 'white';
  @HostBinding('style.cursor') cursor = 'auto';
}
