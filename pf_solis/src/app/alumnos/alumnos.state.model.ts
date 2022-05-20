import { AlumnoItem } from "./alumno-item";

export interface AlumnosState {
    cargandoAlumnos: boolean;
    alumnosCargados: AlumnoItem[];
    alumnoActual: AlumnoItem;
}