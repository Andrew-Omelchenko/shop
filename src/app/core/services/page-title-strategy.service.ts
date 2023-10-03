import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class PageTitleStrategyService extends TitleStrategy {
  constructor(private titleService: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);

    if (title !== undefined) {
      this.titleService.setTitle(`Shop - ${title}`);
    } else {
      this.titleService.setTitle(`Shop`);
    }
  }
}
