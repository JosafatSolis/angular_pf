import { createReducer, on } from '@ngrx/store';
import { AlumnoItem } from '../alumno-item';
import { alumnoActualizado, triggerCargarAlumno, triggerCargarAlumnos, cargarAlumnosFailure, cargarAlumnosSuccess, trigguerEliminarAlumno, eliminarAlumnoFailure, triggerGuardarAlumno, guardarAlumnoFailure } from './alumnos.actions';


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
  on(triggerCargarAlumnos, (estado) => {
    return {...estado, cargandoAlumnos: true, estadoError: ''}
  }),
  on(cargarAlumnosSuccess, (estado, {alumnos}) => {
    return {...estado, cargandoAlumnos: false, alumnosCargados: alumnos, estadoError: ''}
  }),
  on(triggerCargarAlumno, (estado, {id}) => {
    return {...estado}
  }),
  on(alumnoActualizado, (estado, {alumno}) => {
    return {...estado, alumnoActual: alumno}
  }),
  on(cargarAlumnosFailure, (estado, {error}) => {
    return {...estado, estadoError: error.message}
  }),
  on(trigguerEliminarAlumno, (estado, {id}) => {
    return {...estado, estadoError: ''}
  }),
  on(eliminarAlumnoFailure, (estado, {error}) => {
    return {...estado, estadoError: error.message}
  }),
  on(triggerGuardarAlumno, (estado, {alumno}) => {
    return {...estado}
  }),
  on(guardarAlumnoFailure, (estado, { error }) => {
    return {...estado, estadoError: error.message}
  })
);
