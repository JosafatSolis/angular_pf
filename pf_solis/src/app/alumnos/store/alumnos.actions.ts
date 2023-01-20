import { createAction, props } from '@ngrx/store';
import { AlumnoItem } from '../alumno-item';

export const triggerCargarAlumnos = createAction(
  '[Alumnos] Trigger Cargar Alumnos'
);

export const cargarAlumnosSuccess = createAction(
  '[Alumnos] Cargar Alumnos Success',
  props<{ alumnos: AlumnoItem[] }>()
);

export const cargarAlumnosFailure = createAction(
  '[Alumnos] Cargar Alumnos Failure',
  props<{ error: any }>()
);

export const triggerCargarAlumno = createAction(
  '[Alumnos] Trigger Cargar Alumno',
  props<{id: string}>()
)

export const alumnoActualizado = createAction(
  '[Alumnos] Alumno Actualizado',
  props<{ alumno: AlumnoItem }>()
)

export const trigguerEliminarAlumno = createAction(
  '[Alumnos] Trigger Eliminar Alumno',
  props<{id: string}>()
)

export const eliminarAlumnoFailure = createAction(
  '[Alumno] Eliminar Alumno Failure',
  props<{error: any}>()
)

export const triggerGuardarAlumno = createAction(
  '[Alumno] Trigger Guardar Alumno',
  props<{alumno: AlumnoItem}>()
)

export const guardarAlumnoFailure = createAction(
  '[Alumno] Guardar Alumno Failure',
  props<{error: any}>()
)

export const triggerCrearAlumno = createAction(
  '[Alumno] Trigger Crear Alumno',
  props<{ alumno: AlumnoItem}>()
)

export const crearAlumnoFailure = createAction(
  '[Alumno] Crear Alumno Failure',
  props<{ error: any }>()
)