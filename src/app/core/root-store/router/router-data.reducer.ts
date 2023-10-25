import { Action, createReducer, on } from '@ngrx/store';
import { ROUTER_REQUEST } from '@ngrx/router-store';
import { goAction } from './router.actions';

export interface TransitionDataModel {
  path: string | null;
  data: unknown;
}
export const initialTransDataState: TransitionDataModel = {
  path: null,
  data: {},
};

const reducer = createReducer(
  initialTransDataState,

  on(goAction, (state, { path, transData }) => {
    if (!transData) {
      return {
        path: null,
        data: {},
      };
    }
    const pathStr = path.join('/');

    return {
      ...state,
      path: /^\//.test(pathStr) ? pathStr : `/${pathStr}`,
      data: transData,
    };
  }),

  on({ type: ROUTER_REQUEST } as any, (state, action) => {
    const act = action as any;

    if (act.payload && act.payload.event && act.payload.event.url === state.path) {
      return state;
    }
    return {
      ...state,
      path: null,
      data: {},
    };
  }),
);

export function routerDataReducer(state: TransitionDataModel | undefined, action: Action) {
  return reducer(state, action);
}
