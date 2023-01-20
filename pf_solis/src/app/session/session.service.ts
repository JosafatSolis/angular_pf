import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioItem } from './usuario-item';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private options: {
    headers?: HttpHeaders
  }

  constructor( private http: HttpClient ) {
    this.options = {headers: new HttpHeaders({
      'X-Parse-Application-Id': '53snk0xdPqsDnp0MjwETVzYQenRzyOApwBmFsZls',
      'X-Parse-REST-API-Key': 'x7BS3CB3RzmaOFJ5KcDIA9fNeo4iDBX0aeZLPMUQ'
    })}
   }

  getUsuarios(): Observable<UsuarioItem[]> {
    return this.http.get<UsuarioItem[]>(environment.API_BASE_URL + 'classes/usuario', this.options);
  }

  getUsuario(id: string): Observable<UsuarioItem> {
    return this.http.get<UsuarioItem>(environment.API_BASE_URL + 'classes/usuario/' + id, this.options);
  }

  addUsuario(Usuario: UsuarioItem): Observable<UsuarioItem> {
    return this.http.post<UsuarioItem>(environment.API_BASE_URL + 'classes/usuario', Usuario, this.options);
  }

  updateUsuario(Usuario: UsuarioItem): Observable<UsuarioItem> {
    return this.http.put<UsuarioItem>(environment.API_BASE_URL + 'classes/usuario/' + Usuario.id, Usuario, this.options);
  }

  deleteUsuario(id: string): Observable<UsuarioItem> {
    return this.http.delete<UsuarioItem>(environment.API_BASE_URL + 'classes/usuario/' + id, this.options);
  }
  
}
