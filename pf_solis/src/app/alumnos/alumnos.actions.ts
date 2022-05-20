import { createAction, props } from '@ngrx/store';
import { AlumnoItem } from './alumno-item';

export const cargarAlumnoss = createAction(
  '[Alumnos] Cargar Alumnoss'
);

export const cargarAlumnossSuccess = createAction(
  '[Alumnos] Cargar Alumnoss Success',
  props<{ data: any }>()
);

export const cargarAlumnossFailure = createAction(
  '[Alumnos] Cargar Alumnoss Failure',
  props<{ error: any }>()
);

export const alumnoActualizado = createAction(
  '[Alumnos] Alumno Actualizado',
  props<{ alumno: AlumnoItem }>()
)
