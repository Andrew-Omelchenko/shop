import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Params, Data } from '@angular/router';

import { ROUTER_FEATURE } from './feature';
import { RouterStateModel } from './router.module';

export const getRouterBaseState = createFeatureSelector<RouterStateModel>(ROUTER_FEATURE);
export const getRouterState = createSelector(getRouterBaseState, ({ router }) => router);
export const getRouterParams = createSelector(getRouterState, (routerState): Params => routerState.state.params);

export const getRouterParamMap = createSelector(getRouterState, (routerState): Params => routerState.state.paramMap);
export const getRouterData = createSelector(getRouterState, (routerState): Data => routerState.state.data);
export const getQueryParams = createSelector(
  getRouterState,
  (routerState): Params => (routerState.state && routerState.state.queryParams) || {},
);
export const getActiveURL = createSelector(getRouterState, (routerState): string => routerState.state.url);

// TODO
// export const getTransitionData = createSelector(getRouterBaseState, ({ transition }) => transition.data);
