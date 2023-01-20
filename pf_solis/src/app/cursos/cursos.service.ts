import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CursoItem } from './curso-item';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private options: {
    headers?: HttpHeaders
  }

  constructor( private http: HttpClient ) { 
    this.options = {headers: new HttpHeaders({
      'X-Parse-Application-Id': '53snk0xdPqsDnp0MjwETVzYQenRzyOApwBmFsZls',
      'X-Parse-REST-API-Key': 'x7BS3CB3RzmaOFJ5KcDIA9fNeo4iDBX0aeZLPMUQ'
    })}
  }

  getCursos(): Observable<CursoItem[]> {
    return this.http.get<CursoItem[]>(environment.API_BASE_URL + 'classes/curso', this.options);
  }

  getCurso(id: string): Observable<CursoItem> {
    return this.http.get<CursoItem>(environment.API_BASE_URL + 'classes/curso/' + id, this.options);
  }

  addCurso(curso: CursoItem): Observable<CursoItem> {
    return this.http.post<CursoItem>(environment.API_BASE_URL + 'classes/curso', curso, this.options)
  }

  updateCurso(curso: CursoItem): Observable<CursoItem> {
    return this.http.put<CursoItem>(environment.API_BASE_URL + 'classes/curso/' + curso.id, curso, this.options)
  }

  deleteCurso(id: string): Observable<CursoItem> {
    return this.http.delete<CursoItem>(environment.API_BASE_URL + 'classes/curso/' + id, this.options)
  }
}
