import { createAction, props } from '@ngrx/store';
import { AlumnoItem } from '../alumno-item';

export const cargarAlumnos = createAction(
  '[Alumnos] Cargar Alumnos'
);

export const cargarAlumnosSuccess = createAction(
  '[Alumnos] Cargar Alumnos Success',
  props<{ alumnos: AlumnoItem[] }>()
);

export const cargarAlumnosFailure = createAction(
  '[Alumnos] Cargar Alumnos Failure',
  props<{ error: any }>()
);

export const cargarAlumno = createAction(
  '[Alumnos] Cargar Alumno',
  props<{id: number}>()
)

export const alumnoActualizado = createAction(
  '[Alumnos] Alumno Actualizado',
  props<{ alumno: AlumnoItem }>()
)

export const eliminarAlumno = createAction(
  '[Alumnos] Eliminar Alumno',
  props<{id: number}>()
)

export const eliminarAlumnoFailure = createAction(
  '[Alumno] Eliminar Alumno Failure',
  props<{error: any}>()
)