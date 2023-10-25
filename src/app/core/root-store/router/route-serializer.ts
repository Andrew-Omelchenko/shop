import { Data, ParamMap, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrlModel {
  url: string;
  params: Params;
  queryParams: Params;
  fragment: string;
  paramMap: ParamMap;
  data: Data;
}

export class RouteSerializer implements RouterStateSerializer<RouterStateUrlModel> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrlModel {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url } = routerState;

    const { params, queryParams, fragment, paramMap, data } = route;

    return { url, params, queryParams, paramMap, data, fragment: fragment || '' };
  }
}
