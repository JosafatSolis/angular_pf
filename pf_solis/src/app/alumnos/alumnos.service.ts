import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoItem } from './alumno-item';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor( private http: HttpClient ) { }

  getAlumnos(): Observable<AlumnoItem[]> {
    return this.http.get<AlumnoItem[]>(environment.API_BASE_URL + 'alumnos');
  }

  getAlumno(id: number): Observable<AlumnoItem> {
    return this.http.get<AlumnoItem>(environment.API_BASE_URL + 'alumnos/' + String(id));
  }

  addAlumno(alumno: AlumnoItem): Observable<AlumnoItem> {
    return this.http.post<AlumnoItem>(environment.API_BASE_URL + 'alumnos', alumno);
  }

  updateAlumno(alumno: AlumnoItem): Observable<AlumnoItem> {
    return this.http.put<AlumnoItem>(environment.API_BASE_URL + 'alumnos/' + String(alumno.id), alumno);
  }

  deleteAlumno(id: number): Observable<AlumnoItem> {
    return this.http.delete<AlumnoItem>(environment.API_BASE_URL + 'alumnos/' + String(id));
  }
}
