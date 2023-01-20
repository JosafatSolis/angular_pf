import { AlumnoItem } from "../alumnos/alumno-item";
import { CursoItem } from "../cursos/curso-item";
import { UsuarioItem } from "../session/usuario-item";

export interface InscripcionItem {
    id: string;
    alumno: AlumnoItem;
    curso: CursoItem;
    fechaInscripcion: Date;
    fechaBorrado: Date | null;
    inscritoPor: UsuarioItem;
    borradoPor: UsuarioItem | null;
}
