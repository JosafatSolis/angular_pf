import { createReducer, on } from '@ngrx/store';
import { AlumnoItem } from '../alumno-item';
import { alumnoActualizado, cargarAlumno, cargarAlumnos, cargarAlumnosFailure, cargarAlumnosSuccess, eliminarAlumno, eliminarAlumnoFailure } from './alumnos.actions';


export const alumnosFeatureKey = 'alumnosState';

export interface AlumnosFeatureState {
  cargandoAlumnos: boolean;
  alumnosCargados: AlumnoItem[];
  alumnoActual: AlumnoItem | null;
  estadoError: string;
}

export const initialState: AlumnosFeatureState = {
  cargandoAlumnos: false,
  alumnosCargados: [],
  alumnoActual: null,
  estadoError: ''
};

export const alumnosReducer = createReducer(
  initialState,
  on(cargarAlumnos, (estado) => {
    return {...estado, cargandoAlumnos: true, estadoError: ''}
  }),
  on(cargarAlumnosSuccess, (estado, {alumnos}) => {
    return {...estado, cargandoAlumnos: false, alumnosCargados: alumnos, estadoError: ''}
  }),
  on(cargarAlumno, (estado, {id}) => {
    return {...estado}
  }),
  on(alumnoActualizado, (estado, {alumno}) => {
    return {...estado, alumnoActual: alumno}
  }),
  on(cargarAlumnosFailure, (estado, {error}) => {
    return {...estado, estadoError: error.message}
  }),
  on(eliminarAlumno, (estado, {id}) => {
    return {...estado, estadoError: ''}
  }),
  on(eliminarAlumnoFailure, (estado, {error}) => {
    return {...estado, estadoError: error.message}
  })
);
