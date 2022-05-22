import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromAlumnosReducer from './alumnos.reducer';

export const alumnosStoreFeatureKey = 'alumnosStore';

export interface AlumnosStoreState {

  [fromAlumnosReducer.alumnosFeatureKey]: fromAlumnosReducer.AlumnosState;
}

export const reducers: ActionReducerMap<AlumnosStoreState> = {

  [fromAlumnosReducer.alumnosFeatureKey]: fromAlumnosReducer.alumnosReducer,
};


export const metaReducers: MetaReducer<AlumnosStoreState>[] = !environment.production ? [] : [];
