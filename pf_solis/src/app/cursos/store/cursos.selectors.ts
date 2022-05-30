import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cursosStoreFeatureKey, CursosStoreState } from '.';

const selectorCursos = createFeatureSelector<CursosStoreState>(cursosStoreFeatureKey);

// cargandoCursos
export const selectorCargandoCursos = createSelector(
    selectorCursos,
    (storeState) => storeState.cursosState.cargandoCursos
)

// cursosCargados
export const selectorCursosCargados = createSelector(
    selectorCursos,
    (storeState) => storeState.cursosState.cursosCargados
)

// cursoActual
export const selectorCursoActual = createSelector(
    selectorCursos,
    (storeState) => storeState.cursosState.cursoActual
)

// estadoError
export const selectorCursosEstadoError = createSelector(
    selectorCursos,
    (storeState) => storeState.cursosState.estadoError
)