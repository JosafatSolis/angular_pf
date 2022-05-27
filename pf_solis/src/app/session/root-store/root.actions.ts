import { createAction, props } from '@ngrx/store';
import { UsuarioItem } from '../usuario-item';

export const cargarUsuarioActual = createAction(
  '[Root] Cargar Usuario Actual'
);

export const cargarUsuarioActualSuccess = createAction(
  '[Root] Cargar Usuario Actual Success',
  props<{ usuario: UsuarioItem }>()
);

export const cargarUsuarioActualFailure = createAction(
  '[Root] Cargar Usuario Actual Failure'
);

export const loginUsuario = createAction(
  '[Root] Login Usuario'
);

export const loginUsuarioSuccess = createAction(
  '[Root] Login Usuario Success',
  props<{ usuario: UsuarioItem }>()
);

export const loginUsuarioFailure = createAction(
  '[Root] Login Usuario Failure',
  props<{ error: any }>()
);
