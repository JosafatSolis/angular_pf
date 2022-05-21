import { Action, createReducer, on } from '@ngrx/store';
import { AlumnoItem } from '../alumno-item';


export const alumnosReducerFeatureKey = 'alumnosReducer';

export interface AlumnosReducerState {
    cargandoAlumnos: boolean;
    alumnosCargados: AlumnoItem[];
    alumnoActual: AlumnoItem;
}

export const initialState: AlumnosReducerState = {

};

export const alumnosReducer = createReducer(
  initialState,

);
