import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('appTitle', { static: true })
  title!: ElementRef<HTMLHeadingElement>;

  ngOnInit(): void {
    (this.title.nativeElement as HTMLHeadingElement).innerText = 'Shop';
  }
}
