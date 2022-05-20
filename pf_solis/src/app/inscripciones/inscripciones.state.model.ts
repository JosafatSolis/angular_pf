import { AlumnoItem } from "../alumnos/alumno-item";
import { CursoItem } from "../cursos/curso-item";
import { InscripcionItem } from "./inscripcion-item";

export interface InscripcionesState {
    cargandoInscripciones: boolean;
    inscripcionesCargadas: InscripcionItem[];
    alumnoActual: AlumnoItem;
    cursoActual: CursoItem;
}