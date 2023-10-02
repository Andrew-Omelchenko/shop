import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-page-forbidden',
  templateUrl: './page-forbidden.component.html',
  styleUrls: ['./page-forbidden.component.scss'],
})
export class PageForbiddenComponent implements OnInit, OnDestroy {
  redirectUrl = '/products-list';

  private onDestroy$$: Subject<void> = new Subject<void>();
  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        takeUntil(this.onDestroy$$),
        map((params) => params?.['redirectUrl']),
        distinctUntilChanged(),
      )
      .subscribe((redirectUrl) => {
        this.redirectUrl = redirectUrl;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$$.next();
    this.onDestroy$$.complete();
  }
}
