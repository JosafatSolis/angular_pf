import { CursoItem } from "../cursos/curso-item"

export interface AlumnoItem {
    id: string,
    matricula: number,
    nombre: string,
    apellidos: string,
    email: string,
    fechaNacimiento: Date,
    genero: string
    cursos: CursoItem[]
}
