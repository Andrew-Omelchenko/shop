import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFgColor]',
})
export class FgColorDirective {
  @Input() appFgColor = '#000000';

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('click')
  onClick(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'color', this.appFgColor);
  }
}
