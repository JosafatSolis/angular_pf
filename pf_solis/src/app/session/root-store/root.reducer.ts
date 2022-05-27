import { Action, createReducer, on } from '@ngrx/store';
import { UsuarioItem } from '../usuario-item';
import { cargarUsuarioActual, cargarUsuarioActualFailure, cargarUsuarioActualSuccess, loginUsuario, loginUsuarioFailure, loginUsuarioSuccess } from './root.actions';


export const rootFeatureKey = 'root';

export interface RootState {
  usuarioActual: UsuarioItem | null;
  estadoError: string;
}

export const initialState: RootState = {
  usuarioActual: null,
  estadoError: ''
};

export const rootReducer = createReducer(
  initialState,
  on(cargarUsuarioActual, (state) => {
    return {...state, usuarioActual: null, estadoError: ''}}),
  on(cargarUsuarioActualSuccess, (state, {usuario}) => {
    return {...state, usuarioActual: usuario, estadoError: ''}
  }),
  on(cargarUsuarioActualFailure, (state) => {
    return {...state, usuarioActual: null}
  }),
  on(loginUsuario, (state) => {
    return {...state, usuarioActual: null, estadoError: ''}
  }),
  on(loginUsuarioSuccess, (state, {usuario}) => {
    return {...state, usuarioActual: usuario, estadoError: ''}
  }),
  on(loginUsuarioFailure, (state, {error}) => {
    return {...state, usuarioActual: null, estadoError: error.message}
  })
);
