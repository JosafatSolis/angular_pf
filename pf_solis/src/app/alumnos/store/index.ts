import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromAlumnosReducer from './alumnos-reducer.reducer';

export const alumnosStoreFeatureKey = 'alumnosStore';

export interface AlumnosStoreState {

  [fromAlumnosReducer.alumnosReducerFeatureKey]: fromAlumnosReducer.AlumnosReducerState;
}

export const reducers: ActionReducerMap<AlumnosStoreState> = {

  [fromAlumnosReducer.alumnosReducerFeatureKey]: fromAlumnosReducer.alumnosReducer,
};


export const metaReducers: MetaReducer<AlumnosStoreState>[] = !environment.production ? [] : [];
