import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExtensionActionTypes } from '@ngrx/store-devtools/src/extension';
import { catchError, EMPTY, exhaustMap, map, Observable, switchMap, of } from 'rxjs';
import { AlumnoItem } from '../alumno-item';
import { AlumnosService } from '../alumnos.service';
import { cargarAlumno, alumnoActualizado, cargarAlumnos, cargarAlumnosSuccess, cargarAlumnosFailure } from './alumnos.actions';



@Injectable()
export class AlumnosEffects {

  // cargarAlumnosEffect$ = createEffect( () => this.actions$.pipe(
  //   ofType(cargarAlumnos),
  //   exhaustMap(() => this.as.getAlumnos().pipe(
  //     map(resp => cargarAlumnosSuccess({alumnos: resp})))
  //   )
  // ))

  cargarAlumnosEffect$ = createEffect( () => this.actions$.pipe(
    ofType(cargarAlumnos),
    switchMap(() =>
      this.as.getAlumnos().pipe(
        map((alumnos: AlumnoItem[]) => {
          return cargarAlumnosSuccess({alumnos})
        }),
        catchError((error) => {
          return of(cargarAlumnosFailure({error}))
        })
      )
    )
  ))

  cargarAlumnoEffect$ = createEffect( () => this.actions$.pipe(
    ofType(cargarAlumno),
    exhaustMap((ca) => this.as.getAlumno(ca.id).pipe(
      map((alumno) => alumnoActualizado({alumno}))
    ))
  ))

  // algo() {
  //   this.as.getAlumnos().pipe(
  //   map((alumno) => console.log(alumno))
  //   )
  // }

  constructor(
    private actions$: Actions,
    private as: AlumnosService) {}

}

