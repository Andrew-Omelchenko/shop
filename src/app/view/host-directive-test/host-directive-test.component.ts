import { Component, Directive, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hostDirectiveTest]',
  standalone: true,
})
export class HostDirTestDirective {
  private static isActive = false;
  public static toggle(): void {
    HostDirTestDirective.isActive = !HostDirTestDirective.isActive;
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: Event): void {
    (event.target as HTMLElement).style.textDecoration = HostDirTestDirective.isActive ? 'underline' : 'none';
  }
  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: Event): void {
    (event.target as HTMLElement).style.textDecoration = 'none';
  }
}

@Component({
  selector: 'app-host-directive-test',
  template: '<p>Hover over this text to test</p>',
  standalone: true,
  hostDirectives: [HostDirTestDirective],
})
export class HostDirectiveTestComponent {}

@Component({
  selector: 'app-test',
  template: `
    <button (click)="onToggle()">Click to toggle text underlining</button>
    <app-host-directive-test></app-host-directive-test>
  `,
  standalone: true,
  imports: [HostDirTestDirective, HostDirectiveTestComponent],
})
export class TestComponent {
  onToggle(): void {
    HostDirTestDirective.toggle();
  }
}
