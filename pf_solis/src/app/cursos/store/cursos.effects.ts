import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CursosService } from '../cursos.service';
import { CursoItem } from '../curso-item';
import {
  triggerCargarCurso,
  triggerCargarCursos,
  cargarCursosFailure,
  cargarCursosSuccess,
  triggerCrearCurso,
  crearCursoFailure,
  cursoActualizado,
  triggerEliminarCurso,
  eliminarCursoFailure,
  triggerGuardarCurso,
  guardarCursoFailure,
} from './cursos.actions';

@Injectable()
export class CursosEffects {
  // cargarCursos --> cargarCursosSuccess / cargarCursosFailure
  cargarCursosEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(triggerCargarCursos),
      switchMap(() =>
        this.cs.getCursos().pipe(
          map((cursos: CursoItem[]) => cargarCursosSuccess({ cursos })),
          catchError((error) => of(cargarCursosFailure({ error })))
        )
      )
    )
  );

  // cargarCurso --> cursoActualizado / cargarCursoFailure
  cargarCursoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(triggerCargarCurso),
      switchMap((cca) =>
        this.cs.getCurso(cca.id).pipe(
          map((curso) => cursoActualizado({ curso })),
          catchError((error) => of(cargarCursosFailure({ error })))
        )
      )
    )
  );

  // eliminarCurso --> cargarCursos / eliminarCursoFailure
  eliminarCursoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(triggerEliminarCurso),
      switchMap((eca) =>
        this.cs.deleteCurso(eca.id).pipe(
          map(() => triggerCargarCursos()),
          catchError((error) => of(eliminarCursoFailure({ error })))
        )
      )
    )
  );

  // guardarCurso --> cursoActualizado / guardarCursoFailure
  guardarCursoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(triggerGuardarCurso),
      switchMap((gca) =>
        this.cs.updateCurso(gca.curso).pipe(
          map((curso) => cursoActualizado({ curso })),
          catchError((error) => of(guardarCursoFailure({ error })))
        )
      )
    )
  );

  // crearCurso --> cursoActualizado / crearCursoFailure
  crearCursoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(triggerCrearCurso),
      switchMap((cca) =>
        this.cs.addCurso(cca.curso).pipe(
          map((curso) => cursoActualizado({ curso })),
          catchError((error) => of(crearCursoFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private cs: CursosService) {}
}
