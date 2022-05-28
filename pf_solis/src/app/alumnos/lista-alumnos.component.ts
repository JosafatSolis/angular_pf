import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlumnoItem } from './alumno-item';
import { MatDialog } from '@angular/material/dialog';
import * as fromStore from './store';
import { cargarAlumnos, eliminarAlumno } from './store/alumnos.actions';
import { selectorAlumnosCargados, selectorEstadoError } from './store/alumnos.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarBorradoAlumnosComponent } from './confirmar-borrado-alumnos.component';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  displayedColumns: string[] = ["matricula", "nombre", "apellidos", "email", "action"]
  selectedRow: any;

  alumnos$!: Observable<AlumnoItem[]>;

  estadoError$!: Observable<string>;
  strEstadoError!: string;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.store.dispatch(cargarAlumnos());
    this.alumnos$ = this.store.select(selectorAlumnosCargados);
    //this.estadoError$ = this.store.select(selectorEstadoError);
    this.store.select(selectorEstadoError).subscribe((ee) => this.strEstadoError = ee)
  }

  
  changeRowSelected(row: any) {
    this.selectedRow = row;
  }

  onEditarClick(element: AlumnoItem) {
    this.router.navigate([String(element.id)], {relativeTo: this.route, queryParams: { readOnly: false }})    
  }

  onEliminarClick(element: AlumnoItem): void {
    const dialogRef = this.dialog.open(ConfirmarBorradoAlumnosComponent, {
      width: '400px',
      data: element
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(eliminarAlumno(result as AlumnoItem));
      }
    })
  }

  onDetallesClick(alumno: AlumnoItem) {
    this.router.navigate([String(alumno.id)], {relativeTo: this.route, queryParams: { readOnly: true }})    
  }

  onNuevoClick() {
    this.router.navigate(['0'], {relativeTo: this.route, queryParams: { new: true }})
  }

}
