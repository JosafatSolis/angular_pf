import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlumnosStoreState } from '.';
import { AlumnosState } from './alumnos.reducer';

export const selectorAlumnos = (state: AlumnosStoreState) => state.alumnos;

// cargandoAlumnos
export const selectorCargandoAlumnos = createSelector(
    selectorAlumnos,
    (state: AlumnosState) => state.cargandoAlumnos
)

// alumnosCargados
export const selectorAlumnosCargados = createSelector(
    selectorAlumnos,
    (state: AlumnosState) => state.alumnosCargados
)

// alumnoActual
export const selectorAlumnoActual = createSelector(
    selectorAlumnos,
    (state: AlumnosState) => state.alumnoActual
)