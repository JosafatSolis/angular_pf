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

// Se liga el ReducerState con una llave en el FeatureState, y la llave con un Reducer.
export interface AlumnosAppState {

  [fromAlumnosReducer.alumnosFeatureKey]: fromAlumnosReducer.AlumnosFeatureState;
}

export const reducers: ActionReducerMap<AlumnosAppState> = {

  [fromAlumnosReducer.alumnosFeatureKey]: fromAlumnosReducer.alumnosReducer,
};


export const metaReducers: MetaReducer<AlumnosAppState>[] = !environment.production ? [] : [];
