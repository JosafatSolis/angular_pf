import { createReducer, on } from '@ngrx/store';
import { CursoItem } from '../curso-item';
import { triggerCargarCurso, triggerCargarCursos, cargarCursosFailure, cargarCursosSuccess, cursoActualizado, triggerEliminarCurso, eliminarCursoFailure, triggerGuardarCurso, guardarCursoFailure } from './cursos.actions';


export const cursosFeatureKey = 'cursosState';

export interface CursosFeatureState {
  cargandoCursos: boolean;
  cursosCargados: CursoItem[];
  cursoActual: CursoItem | null;
  estadoError: string;
}

export const initialState: CursosFeatureState = {
  cargandoCursos: false,
  cursosCargados: [],
  cursoActual: null,
  estadoError: ''
};

export const cursosReducer = createReducer(
  initialState,
  on(triggerCargarCursos, estado => {
    return { ...estado, cargandoCursos: true, estadoError: '' }
  }),
  on(cargarCursosSuccess, (estado, {cursos}) => {
    return { ...estado, cargandoCursos: false, cursosCargados: cursos, estadoError: '' }
  }),
  on(triggerCargarCurso, (estado, { id }) => {
    return { ...estado }
  }),
  on(cursoActualizado, (estado, { curso }) => {
    return {...estado, cursoActual: curso}
  }),
  on(cargarCursosFailure, (estado, { error }) => {
    return { ...estado, estadoError: error.message }
  }),
  on(triggerEliminarCurso, (estado, { id }) => {
    return { ...estado, estadoError: '' }
  }),
  on(eliminarCursoFailure, (estado, { error }) => {
    return { ...estado, estadoError: error.message }
  }),
  on(triggerGuardarCurso, (estado, { curso }) => {
    return { ...estado }
  }),
  on(guardarCursoFailure, (estado, { error }) => {
    return { ...estado, estadoError: error.message }
  })
);
