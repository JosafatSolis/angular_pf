import { Action, createReducer, on } from '@ngrx/store';
import { AlumnoItem } from 'src/app/alumnos/alumno-item';
import { CursoItem } from 'src/app/cursos/curso-item';
import { InscripcionItem } from '../inscripcion-item';


export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  cargandoInscripciones: boolean;
  inscripcionesCargadas: InscripcionItem[];
  alumnoActual: AlumnoItem | null;
  cursoActual: CursoItem | null;
}

export const initialState: State = {
  cargandoInscripciones: false,
  inscripcionesCargadas: [],
  alumnoActual: null,
  cursoActual: null
};

export const reducer = createReducer(
  initialState,

);
