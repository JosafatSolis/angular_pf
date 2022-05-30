import { createAction, props } from '@ngrx/store';
import { CursoItem } from '../curso-item';

export const triggerCargarCursos = createAction(
  '[Cursos] Trigger Cargar Cursos'
);

export const cargarCursosSuccess = createAction(
  '[Cursos] Cargar Cursos Success',
  props<{ cursos: CursoItem[] }>()
);

export const cargarCursosFailure = createAction(
  '[Cursos] Cargar Cursos Failure',
  props<{ error: any }>()
);

export const triggerCargarCurso = createAction(
  '[Cursos] Trigger Cargar Curso',
  props<{id: number}>()
)

export const cursoActualizado = createAction(
  '[Cursos] Curso Actualizado',
  props<{ curso: CursoItem }>()
)

export const triggerEliminarCurso = createAction(
  '[Cursos] Trigger Eliminar Curso',
  props<{ id: number }>()
)

export const eliminarCursoFailure = createAction(
  '[Cursos] Eliminar Curso Failure',
  props<{ error: any }>()
)

export const triggerGuardarCurso = createAction(
  '[Cursos] Trigger Guardar Curso',
  props<{ curso: CursoItem }>()
)

export const guardarCursoFailure = createAction(
  '[Cursos] Guardar Curso Failure',
  props<{ error: any }>()
)

export const triggerCrearCurso = createAction(
  '[Cursos] Trigger Crear Curso',
  props<{ curso: CursoItem }>()
)

export const crearCursoFailure = createAction(
  '[Cursos] Crear Curso Failure',
  props<{ error: any }>()
)