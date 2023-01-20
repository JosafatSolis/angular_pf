import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlumnoItem } from './alumno-item';
import { MatDialog } from '@angular/material/dialog';
import * as fromStore from './store';
import { triggerCargarAlumnos, trigguerEliminarAlumno } from './store/alumnos.actions';
import { selectorAlumnosCargados, selectorAlumnosEstadoError } from './store/alumnos.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarBorradoAlumnosComponent } from './confirmar-borrado-alumnos.component';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {
  
  alumnos$!: Observable<AlumnoItem[]>;
  strEstadoError!: string;

  selectedRow: any;
  displayedColumns: string[] = ["matricula", "nombre", "apellidos", "email", "action"]

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.store.dispatch(triggerCargarAlumnos());
    this.alumnos$ = this.store.select(selectorAlumnosCargados);
    this.store.select(selectorAlumnosEstadoError).subscribe((ee) => this.strEstadoError = ee);
  }

  changeRowSelected(row: any) {
    this.selectedRow = row;
  }

  onEditarClick(alumno: AlumnoItem) {
    this.router.navigate([alumno.id], {relativeTo: this.route, queryParams: { readOnly: false }});
  }

  onEliminarClick(alumno: AlumnoItem): void {
    const dialogRef = this.dialog.open(ConfirmarBorradoAlumnosComponent, {
      width: '400px',
      data: alumno
    });
    // Si se dio clic en Aceptar
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(trigguerEliminarAlumno(result as AlumnoItem));
      }
    })
  }

  onDetallesClick(alumno: AlumnoItem) {
    this.router.navigate([alumno.id], {relativeTo: this.route, queryParams: { readOnly: true }});
  }

  onNuevoClick() {
    this.router.navigate(['0'], {relativeTo: this.route, queryParams: { new: true }})
  }

}
