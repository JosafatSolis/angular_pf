import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CursoItem } from './curso-item';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor( private http: HttpClient ) { }

  getCursos(): Observable<CursoItem[]> {
    return this.http.get<CursoItem[]>(environment.API_BASE_URL + 'cursos');
  }

  getCurso(id: number): Observable<CursoItem> {
    return this.http.get<CursoItem>(environment.API_BASE_URL + 'cursos/' + String(id));
  }

  addCurso(curso: CursoItem): Observable<CursoItem> {
    return this.http.post<CursoItem>(environment.API_BASE_URL + 'cursos', curso)
  }

  updateCurso(curso: CursoItem): Observable<CursoItem> {
    return this.http.put<CursoItem>(environment.API_BASE_URL + 'cursos/' + curso.id, curso)
  }

  deleteCurso(id: number): Observable<CursoItem> {
    return this.http.delete<CursoItem>(environment.API_BASE_URL + 'cursos/' + id)
  }
}
