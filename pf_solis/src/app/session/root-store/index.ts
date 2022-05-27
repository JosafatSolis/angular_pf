import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromRoot from './root.reducer';


export interface RootAppState {

  [fromRoot.rootFeatureKey]: fromRoot.RootState;
}

export const reducers: ActionReducerMap<RootAppState> = {

  [fromRoot.rootFeatureKey]: fromRoot.rootReducer,
};


export const metaReducers: MetaReducer<RootAppState>[] = !environment.production ? [] : [];
