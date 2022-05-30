import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, of } from 'rxjs';
import { AlumnoItem } from '../alumno-item';
import { AlumnosService } from '../alumnos.service';
import {
  triggerCargarAlumno,
  alumnoActualizado,
  triggerCargarAlumnos,
  cargarAlumnosSuccess,
  cargarAlumnosFailure,
  trigguerEliminarAlumno,
  eliminarAlumnoFailure,
  triggerGuardarAlumno,
  guardarAlumnoFailure,
  triggerCrearAlumno,
  crearAlumnoFailure,
} from './alumnos.actions';

@Injectable()
export class AlumnosEffects {
  // cargarAlumnos --> cargarAlumnosSuccess / cargarAlumnosFailure
  cargarAlumnosEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(triggerCargarAlumnos),
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

  // cargarAlumno --> alumnoActualizado
  cargarAlumnoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(triggerCargarAlumno),
      exhaustMap((ca) =>
        this.as
          .getAlumno(ca.id)
          .pipe(map((alumno) => alumnoActualizado({ alumno })))
      )
    )
  );

  // eliminarAlumno --> cargarAlumnos / eliminarAlumnoFailure
  eliminarAlumnoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trigguerEliminarAlumno),
      switchMap((eliminarAlumnoAction) =>
        this.as.deleteAlumno(eliminarAlumnoAction.id).pipe(
          map((alumno: AlumnoItem) => {
            return triggerCargarAlumnos();
          }),
          catchError((error) => {
            return of(eliminarAlumnoFailure({ error }));
          })
        )
      )
    )
  );

  // guardarAlumno --> alumnoActualizado / guardarAlumnoFailure
  guardarAlumnoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(triggerGuardarAlumno),
      switchMap((guardarAlumnoAction) => {
        return this.as.updateAlumno(guardarAlumnoAction.alumno).pipe(
          map((alumno: AlumnoItem) => {
            return alumnoActualizado({ alumno });
          }),
          catchError((error) => {
            return of(guardarAlumnoFailure({ error }));
          })
        );
      })
    )
  );

  // crearAlumno --> alumnoActualizado / crearAlumnoFailure
  // Sin uso de return, para fines académicos
  crearAlumnoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(triggerCrearAlumno),
      switchMap((crearAlumnoAction) =>
        this.as.addAlumno(crearAlumnoAction.alumno).pipe(
          map((alumno: AlumnoItem) => alumnoActualizado({ alumno })),
          catchError((error) => of(crearAlumnoFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private as: AlumnosService) {}
}
