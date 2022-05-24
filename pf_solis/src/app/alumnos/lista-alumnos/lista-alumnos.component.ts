import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlumnoItem } from '../alumno-item';
import * as fromStore from '../store';
import { cargarAlumnos } from '../store/alumnos.actions';
import { AlumnosFeatureState } from '../store/alumnos.reducer';
import { selectorAlumnosCargados, selectorEstadoError } from '../store/alumnos.selectors';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  alumnos$!: Observable<AlumnoItem[]>;
  estadoError$!: Observable<string>;
  strEstadoError!: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(cargarAlumnos());
    this.alumnos$ = this.store.select(selectorAlumnosCargados);
    //this.estadoError$ = this.store.select(selectorEstadoError);
    this.store.select(selectorEstadoError).subscribe((ee) => this.strEstadoError = ee)
  }

  mostrar() {
    // this.alumnos$.subscribe((ac) => {
    //   console.log(ac);
    // })
    
  }

}
