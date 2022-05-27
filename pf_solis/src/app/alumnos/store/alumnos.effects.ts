import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, of } from 'rxjs';
import { AlumnoItem } from '../alumno-item';
import { AlumnosService } from '../alumnos.service';
import {
  cargarAlumno,
  alumnoActualizado,
  cargarAlumnos,
  cargarAlumnosSuccess,
  cargarAlumnosFailure,
  eliminarAlumno,
  eliminarAlumnoFailure,
} from './alumnos.actions';

@Injectable()
export class AlumnosEffects {
  cargarAlumnosEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cargarAlumnos),
      switchMap(() =>
        this.as.getAlumnos().pipe(
          map((alumnos: AlumnoItem[]) => {
            return cargarAlumnosSuccess({ alumnos });
          }),
          catchError((error) => {
            return of(cargarAlumnosFailure({ error }));
          })
        )
      )
    )
  );

  cargarAlumnoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cargarAlumno),
      exhaustMap((ca) =>
        this.as
          .getAlumno(ca.id)
          .pipe(map((alumno) => alumnoActualizado({ alumno })))
      )
    )
  );

  eliminarAlumnoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eliminarAlumno),
      switchMap((eliminarAlumnoAction) =>
        this.as.deleteAlumno(eliminarAlumnoAction.id).pipe(
          map((alumno: AlumnoItem) => {
            return cargarAlumnos();
          }),
          catchError((error) => {
            return of(eliminarAlumnoFailure({ error }));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private as: AlumnosService) {}
}
