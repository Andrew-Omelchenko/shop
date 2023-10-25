import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterStateUrlModel, RouteSerializer } from './route-serializer';
import { ROUTER_FEATURE } from './feature';
import { routerDataReducer, TransitionDataModel } from './router-data.reducer';
import { RouterEffects } from './router.effects';

export interface RouterStateModel {
  router: RouterReducerState<RouterStateUrlModel>;
  // TODO
  // transition: TransitionDataModel;
}

@NgModule({
  declarations: [],
  imports: [
    StoreRouterConnectingModule.forRoot({
      serializer: RouteSerializer,
    }),
    StoreModule.forFeature(ROUTER_FEATURE, {
      router: routerReducer,
      // TODO
      // transition: routerDataReducer,
    }),
    EffectsModule.forFeature([RouterEffects]),
  ],
})
export class RouterStoreModule {}
