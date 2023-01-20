import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoItem } from './alumno-item';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private options: {
    headers?: HttpHeaders
  }
  
  constructor( private http: HttpClient ) {
    this.options = {headers: new HttpHeaders({
      'X-Parse-Application-Id': '53snk0xdPqsDnp0MjwETVzYQenRzyOApwBmFsZls',
      'X-Parse-REST-API-Key': 'x7BS3CB3RzmaOFJ5KcDIA9fNeo4iDBX0aeZLPMUQ'
    })}
   }

  getAlumnos(): Observable<AlumnoItem[]> {
    return this.http.get<AlumnoItem[]>(environment.API_BASE_URL + 'classes/alumno', this.options);
  }

  getAlumno(id: string): Observable<AlumnoItem> {
    return this.http.get<AlumnoItem>(environment.API_BASE_URL + 'classes/alumno/' + id, this.options);
  }

  formatAlumno(alumno: AlumnoItem): object {
    return {
      "matricula": Number(alumno.matricula),
      "nombre": alumno.nombre,
      "apellidos": alumno.apellidos,
      "email": alumno.email,
      "fechaNacimiento": {"__type":"Date", "iso": alumno.fechaNacimiento + "T0:0:0.0Z"},
      "genero": alumno.genero
    }
  }

  addAlumno(alumno: AlumnoItem): Observable<AlumnoItem> {
    return this.http.post<AlumnoItem>(environment.API_BASE_URL + 'classes/alumno', this.formatAlumno(alumno), this.options);
  }

  updateAlumno(alumno: AlumnoItem): Observable<AlumnoItem> {
    return this.http.put<AlumnoItem>(environment.API_BASE_URL + 'classes/alumno/' + alumno.id, alumno, this.options);
  }

  deleteAlumno(id: string): Observable<AlumnoItem> {
    return this.http.delete<AlumnoItem>(environment.API_BASE_URL + 'classes/alumno/' + id, this.options);
  }
}
