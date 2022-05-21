import { createAction, props } from '@ngrx/store';
import { AlumnoItem } from '../alumno-item';

export const cargarAlumnos = createAction(
  '[Alumnos] Cargar Alumnos'
);

export const cargarAlumnosSuccess = createAction(
  '[Alumnos] Cargar Alumnos Success',
  props<{ data: any }>()
);

export const cargarAlumnosFailure = createAction(
  '[Alumnos] Cargar Alumnos Failure',
  props<{ error: any }>()
);

export const alumnoActualizado = createAction(
  '[Alumnos] Alumno Actualizado',
  props<{ alumno: AlumnoItem }>()
)