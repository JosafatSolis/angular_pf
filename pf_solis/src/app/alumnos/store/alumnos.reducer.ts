import { Action, createReducer, on } from '@ngrx/store';
import { AlumnoItem } from '../alumno-item';


export const alumnosFeatureKey = 'alumnos';

export interface AlumnosState {
  cargandoAlumnos: boolean;
  alumnosCargados: AlumnoItem[];
  alumnoActual: AlumnoItem | null;
}

export const initialState: AlumnosState = {
  cargandoAlumnos: false,
  alumnosCargados: [],
  alumnoActual: null
};

export const alumnosReducer = createReducer(
  initialState,

);
