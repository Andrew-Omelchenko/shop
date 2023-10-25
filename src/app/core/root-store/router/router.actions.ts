import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const goAction = createAction(
  '[Router] Go',
  props<{
    path: unknown[];
    queryParams?: object;
    extras?: NavigationExtras;
    transData?: unknown;
    skipReuseNextRoute?: boolean;
  }>(),
);
export const goRelativeAction = createAction(
  '[Router] Go relative',
  props<{
    path: string[];
    queryParams?: object;
    extras?: NavigationExtras;
  }>(),
);

export const goBackByLocationAction = createAction('[Router] Go back by location');

export const goBackAction = createAction('[Router] Go back');

export const goNextAction = createAction('[Router] Go next');
export const goNextWithTransDataAction = createAction(
  '[Router] Go Next with transition data',
  props<{ transData?: unknown }>(),
);

export const goToCommandAction = createAction(
  '[Router] Go to command',
  props<{ cmd: string; queryParams?: object; transData?: unknown }>(),
);
