import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AlumnosAppState, alumnosStoreFeatureKey } from '.';

// Se especifica el tipo del AppState del Feature y la llave del Store
const selectorAlumnos = createFeatureSelector<AlumnosAppState>(alumnosStoreFeatureKey);

// cargandoAlumnos
export const selectorCargandoAlumnos = createSelector(
    selectorAlumnos,
    (appState) => appState.alumnosState.cargandoAlumnos
)

// alumnosCargados
export const selectorAlumnosCargados = createSelector(
    selectorAlumnos,
    (appState) => appState.alumnosState.alumnosCargados
)
    
// alumnoActual
export const selectorAlumnoActual = createSelector(
    selectorAlumnos,
    (appState) => appState.alumnosState.alumnoActual
)

// estadoError
export const selectorAlumnosEstadoError = createSelector(
    selectorAlumnos,
    (estado) => estado.alumnosState.estadoError
)