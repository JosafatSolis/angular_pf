import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioItem } from './usuario-item';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor( private http: HttpClient ) { }

  getUsuarios(): Observable<UsuarioItem[]> {
    return this.http.get<UsuarioItem[]>(environment.API_BASE_URL + 'Usuarios');
  }

  getUsuario(id: number): Observable<UsuarioItem> {
    return this.http.get<UsuarioItem>(environment.API_BASE_URL + 'Usuarios/' + String(id));
  }

  addUsuario(Usuario: UsuarioItem): Observable<UsuarioItem> {
    return this.http.post<UsuarioItem>(environment.API_BASE_URL + 'Usuarios', Usuario);
  }

  updateUsuario(Usuario: UsuarioItem): Observable<UsuarioItem> {
    return this.http.put<UsuarioItem>(environment.API_BASE_URL + 'Usuarios/' + String(Usuario.id), Usuario);
  }

  deleteUsuario(id: number): Observable<UsuarioItem> {
    return this.http.delete<UsuarioItem>(environment.API_BASE_URL + 'Usuarios/' + String(id));
  }
  
}
