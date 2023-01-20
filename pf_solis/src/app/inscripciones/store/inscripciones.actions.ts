import { createAction, props } from '@ngrx/store';

export const cargarInscripcioness = createAction(
  '[Inscripciones] Cargar Inscripcioness'
);

export const cargarInscripcionessSuccess = createAction(
  '[Inscripciones] Cargar Inscripcioness Success',
  props<{ data: any }>()
);

export const cargarInscripcionessFailure = createAction(
  '[Inscripciones] Cargar Inscripcioness Failure',
  props<{ error: any }>()
);
