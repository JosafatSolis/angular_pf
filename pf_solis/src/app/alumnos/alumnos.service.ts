import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoItem } from './alumno-item';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor( private http: HttpClient ) { }

  // getAlumnos(): Observable<AlumnoItem[]> {
  //   return this.http.get<AlumnoItem[]>(environment.API_BASE_URL + 'alumnos');
  // }

  getAlumnos(): Observable<AlumnoItem[]> {
    //return this.http.get<AlumnoItem[]>(environment.API_BASE_URL + 'alumnos');
    return of(this.generaAlumnos()) as Observable<AlumnoItem[]>;
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

  // Métodos de prueba
  generaAlumnos(): AlumnoItem[] {
    return [
    {
      id: 1,
      matricula: 743881,
      nombre: "Jesus",
      apellidos: 'Alvarado',
      email: 'jesus.alvarado@mail.com',
      fechaNacimiento: new Date('2001-02-02'),
      genero: 'Hombre',
      cursos: []
    } as AlumnoItem,
    {
      id: 2,
      matricula: 743882,
      nombre: "Martin",
      apellidos: 'Suárez',
      email: 'martin.suarez@mail.com',
      fechaNacimiento: new Date('1993-12-22'),
      genero: 'Hombre',
      cursos: []
    } as AlumnoItem,
    {
      id: 3,
      matricula: 743883,
      nombre: "Nadia",
      apellidos: 'Ruiz',
      email: 'nadia.ruiz@mail.com',
      fechaNacimiento: new Date('1951-01-25'),
      genero: 'Mujer',
      cursos: []
    } as AlumnoItem
  ];
  } 


}
