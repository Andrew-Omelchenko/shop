import { map, Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { goAction, goBackByLocationAction, goRelativeAction } from './router.actions';
import { LocationService } from '../../services/location.service';

@Injectable()
export class RouterEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly location: LocationService,
  ) {}

  public navigate$: Observable<unknown> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(goAction),
        map(({ path, queryParams, extras }) => {
          this.router.navigate(path, { queryParams, ...extras });
        }),
      );
    },
    { dispatch: false },
  );

  public navigateRelative$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(goRelativeAction),
      map(({ path, queryParams, extras }) =>
        goAction({
          extras,
          queryParams,
          path: prepareRelativePathToUrl(path, this.router.url.split('?')[0]),
        }),
      ),
    );
  });

  public navigateBackByLocation$: Observable<void> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(goBackByLocationAction),
        map(() => this.location.goBack()),
      );
    },
    { dispatch: false },
  );
}

function prepareRelativePathToUrl(path: string[], relativeTo: string): string[] {
  const normalizedPathParts = path
    .map((fragment) => fragment.split('/').filter(notEmptyFilterFn))
    .reduce((res, curr) => [...res, ...curr], []);

  const normalizedRelativeTo = relativeTo.split('/').filter(notEmptyFilterFn);

  return [...normalizedRelativeTo, ...normalizedPathParts].reduce((res: string[], current: string) => {
    switch (current) {
      case '.':
        return res;
      case '..':
        res.pop();
        return res;
    }

    return [...res, current];
  }, []);
}

function notEmptyFilterFn(notEmpty: unknown): boolean {
  return !!notEmpty;
}
