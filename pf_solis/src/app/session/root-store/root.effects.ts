import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, of, switchMap } from 'rxjs';
import { SessionService } from '../session.service';
import { UsuarioItem } from '../usuario-item';
import { cargarUsuarioActual, cargarUsuarioActualFailure, cargarUsuarioActualSuccess } from './root.actions';
import { usuarioActualSelector } from './root.selectors';



@Injectable()
export class RootEffects {

  // CargarUsuarioActual, ve si en el Store hay un usuario que no sea nulo, de ser así, dispara Success, de no ser así, dispara Failure
  // cargarUsuarioActualEffect$ = createEffect( () => this.actions$.pipe(
  //   ofType(cargarUsuarioActual),
  //   exhaustMap( () => this.rootStore.select(usuarioActualSelector).pipe(
  //     map( usuario => {
  //       if (usuario) {
  //         return cargarUsuarioActualSuccess({usuario});
  //       } else {
  //         return of(cargarUsuarioActualFailure())
  //       }
        
  //     })
  //   )
    
  // )))

 // cargarAlumnosEffect$ = createEffect( () => this.actions$.pipe(
  //   ofType(cargarAlumnos),
  //   exhaustMap(() => this.as.getAlumnos().pipe(
  //     map(resp => cargarAlumnosSuccess({alumnos: resp})))
  //   )
  // ))

  constructor(
    private actions$: Actions,
    private ss: SessionService,
    private rootStore: Store) {}

}
