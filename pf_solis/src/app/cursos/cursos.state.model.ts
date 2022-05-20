import { CursoItem } from "./curso-item";

export interface CursosState {
    cargandoCursos: boolean;
    cursosCargados: CursoItem[];
    cursoActual: CursoItem;
}