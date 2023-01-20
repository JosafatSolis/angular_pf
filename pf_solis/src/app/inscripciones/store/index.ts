import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromInscripciones from './inscripciones.reducer';

export const inscripcionesStoreFeatureKey = 'inscripcionesStore';

export interface InscripcionesStoreState {

  [fromInscripciones.inscripcionesFeatureKey]: fromInscripciones.State;
}

export const reducers: ActionReducerMap<InscripcionesStoreState> = {

  [fromInscripciones.inscripcionesFeatureKey]: fromInscripciones.reducer,
};


export const metaReducers: MetaReducer<InscripcionesStoreState>[] = !environment.production ? [] : [];
