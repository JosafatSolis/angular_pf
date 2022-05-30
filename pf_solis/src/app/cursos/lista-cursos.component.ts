import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmarBorradoCursosComponent } from './confirmar-borrado-cursos.component';
import { CursoItem } from './curso-item';
import * as fromStore from './store';
import { triggerCargarCursos, triggerEliminarCurso } from './store/cursos.actions';
import { selectorCursosCargados, selectorCursosEstadoError } from './store/cursos.selectors';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit {

  cursos$!: Observable<CursoItem[]>;
  strEstadoError!: string;

  selectedRow: any;
  displayedColumns: string[] = ['id', 'nombre', 'fechaInicio', 'fechaFin', 'creditos', 'action'];

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.store.dispatch(triggerCargarCursos());
    this.cursos$ = this.store.select(selectorCursosCargados);
    this.store.select(selectorCursosEstadoError).subscribe((ee) => this.strEstadoError == ee);
  }

  changeRowSelected(row: any) {
    this.selectedRow = row;
  }

  onEditarClick(curso: CursoItem) {
    this.router.navigate([String(curso.id)], {relativeTo: this.route, queryParams: { readOnly: false }});
  }

  onEliminarClick(curso: CursoItem) {
    const dialogRef = this.dialog.open(ConfirmarBorradoCursosComponent, {
      width: '400px',
      data: curso
    });
    // Si se dio clic en Aceptar
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(triggerEliminarCurso(result as CursoItem));
      }
    })
  }

  onDetallesClick(curso: CursoItem) {
    this.router.navigate([String(curso.id)], {relativeTo: this.route, queryParams: { readOnly: true }});
  }

  onNuevoClick() {
    this.router.navigate(['0'], {relativeTo: this.route, queryParams: { new: true }});
  }

}
