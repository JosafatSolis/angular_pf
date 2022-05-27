import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootAppState } from '.';
import { rootFeatureKey } from './root.reducer';

const rootSelector = createFeatureSelector<RootAppState>(rootFeatureKey);

export const usuarioActualSelector = createSelector(
    rootSelector,
    (state) => state.root.usuarioActual
)

export const CUDalumnosSelector = createSelector(
    rootSelector,
    (state) => state.root.usuarioActual?.alumnosCUD
)

export const CUDcursosSelector = createSelector(
    rootSelector,
    (state) => state.root.usuarioActual?.cursosCUD
)

export const CUDinscripcionesSelector = createSelector(
    rootSelector,
    (state) => state.root.usuarioActual?.inscripcionesCUD
)

export const CUDusuariosSelector = createSelector(
    rootSelector,
    (state) => state.root.usuarioActual?.usuariosCUD
)

export const estadoErrorSelector = createSelector(
    rootSelector,
    (state) => state.root.estadoError
)