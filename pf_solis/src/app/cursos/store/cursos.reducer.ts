import { Action, createReducer, on } from '@ngrx/store';


export const cursosFeatureKey = 'cursos';

export interface CursosState {

}

export const initialState: CursosState = {

};

export const cursosReducer = createReducer(
  initialState,

);
