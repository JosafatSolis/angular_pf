import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromCursosReducer from './cursos.reducer';

export const cursosStoreFeatureKey = 'cursosStore';

export interface CursosStoreState {

  [fromCursosReducer.cursosFeatureKey]: fromCursosReducer.CursosFeatureState;
}

export const reducers: ActionReducerMap<CursosStoreState> = {

  [fromCursosReducer.cursosFeatureKey]: fromCursosReducer.cursosReducer,
};


export const metaReducers: MetaReducer<CursosStoreState>[] = !environment.production ? [] : [];
