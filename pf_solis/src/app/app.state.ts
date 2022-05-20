import { ActionReducerMap } from "@ngrx/store";

import { AlumnosState } from "./alumnos/alumnos.state.model";
import { CursosState } from "./cursos/cursos.state.model";
import { InscripcionesState } from "./inscripciones/inscripciones.state.model";
import { SessionState } from "./session/session.state.model";

export interface AppState {
    alumnos: AlumnosState;
    cursos: CursosState;
    inscripciones: InscripcionesState;
    session: SessionState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    cursos: {}
}