import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AlumnosAppState, alumnosStoreFeatureKey } from '.';

// Se especifica el tipo del AppState del Feature y la llave del Store
const selectorAlumnos = createFeatureSelector<AlumnosAppState>(alumnosStoreFeatureKey);

// cargandoAlumnos
export const selectorCargandoAlumnos = createSelector(
    selectorAlumnos,
    (featureState) => featureState.alumnosState.cargandoAlumnos
)

// alumnosCargados
export const selectorAlumnosCargados = createSelector(
    selectorAlumnos,
    (featureState) => featureState.alumnosState.alumnosCargados
)
    
// alumnoActual
export const selectorAlumnoActual = createSelector(
    selectorAlumnos,
    (featureState) => featureState.alumnosState.alumnoActual
)

// estadoError
export const selectorEstadoError = createSelector(
    selectorAlumnos,
    (estado) => estado.alumnosState.estadoError
)