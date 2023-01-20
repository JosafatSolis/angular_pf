import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AlumnoItem } from '../alumnos/alumno-item';
import { ConfirmarBorradoCursosComponent } from './confirmar-borrado-cursos.component';
import { CursoItem } from './curso-item';
import { triggerCargarCurso, cursoActualizado, triggerEliminarCurso, triggerGuardarCurso, triggerCrearCurso } from './store/cursos.actions';
import { selectorCursoActual } from './store/cursos.selectors';

@Component({
  selector: 'app-detalles-curso',
  templateUrl: './detalles-curso.component.html',
  styleUrls: ['./detalles-curso.component.css']
})
export class DetallesCursoComponent implements OnInit {

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
    ) { }

    readOnly: boolean = true;
    curso$!: Observable<CursoItem | null>;
    cursoId!: string;

    dataSource = new MatTableDataSource<AlumnoItem>();
    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort!: MatSort;

    // En la tabla Alumnos Inscritos
    displayedColumns: string[] = ['matricula', 'nombre', 'apellidos', 'email'];

    formCurso: FormGroup = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value:'', disabled: this.readOnly }, [Validators.required]),
      fechaInicio: new FormControl({ value:'', disabled: this.readOnly }, [Validators.required]),
      fechaFin: new FormControl({ value:'', disabled: this.readOnly }, [Validators.required]),
      creditos: new FormControl({ value:'', disabled: this.readOnly }, [Validators.required]),
      descripcion: new FormControl({ value:'', disabled: this.readOnly }, [Validators.required]),
    })

    controles = {
      id: this.formCurso.get('id') as FormControl,
      nombre: this.formCurso.get('nombre') as FormControl,
      fechaInicio: this.formCurso.get('fechaInicio') as FormControl,
      fechaFin: this.formCurso.get('fechaFin') as FormControl,
      creditos: this.formCurso.get('creditos') as FormControl,
      descripcion: this.formCurso.get('descripcion') as FormControl,
    }

    desHabilita(nvoValor?: boolean) {
      if (typeof nvoValor != 'undefined') {
        this.readOnly = nvoValor;
      }
      // Id siempre deshabilitado
      this.controles.id.disable();
      this.readOnly ? this.controles.nombre.disable() : this.controles.nombre.enable();
      this.readOnly ? this.controles.fechaInicio.disable() : this.controles.fechaInicio.enable();
      this.readOnly ? this.controles.fechaFin.disable() : this.controles.fechaFin.enable();
      this.readOnly ? this.controles.creditos.disable() : this.controles.creditos.enable();
      this.readOnly ? this.controles.descripcion.disable() : this.controles.descripcion.enable();
    }

    cancelaEdicion(curso: CursoItem) {
      this.formCurso.patchValue({
        id: curso.id,
        nombre: curso.nombre,
        fechaInicio: curso.fechaInicio,
        fechaFin: curso.fechaFin,
        creditos: curso.creditos,
        descripcion: curso.descripcion,
      });
      this.desHabilita(true);
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm: ParamMap) => {
      // Se obtiene el Id de la ruta
      let id = String(pm.get('id'));
      // Se despacha el evento según sea o no un ítem existente
      if(!id) {
        this.store.dispatch(cursoActualizado({
          curso: {
            id: '',
            nombre: '',
            fechaInicio: new Date(),
            fechaFin: new Date(),
            creditos: 0,
            descripcion: ''
          }
        }))
      } else {
        this.store.dispatch(triggerCargarCurso({ id }));
      }
    });
    // Se asocia el valor del store al curso actual
    this.curso$ = this.store.select(selectorCursoActual);
    // Cada que cambie el alumno actual, se actualiza el valor por default de los controles
    this.curso$.subscribe((curso) => {
      if (curso) {
        this.cursoId = curso.id;
        // Valor a cada campo
        this.controles.id.setValue(curso.id);
        this.controles.nombre.setValue(curso.nombre);
        this.controles.fechaInicio.setValue(
          formatDate(curso.fechaInicio, 'yyyy-MM-dd', 'en'));
        this.controles.fechaFin.setValue(
          formatDate(curso.fechaFin, 'yyyy-MM-dd', 'en'));
        this.controles.creditos.setValue(curso.creditos);
        this.controles.descripcion.setValue(curso.descripcion);
        // *** PENDIENTE: Cargar datos para la tabla de Alumnos Inscritos ***
        this.dataSource.data = []; // curso.alumnos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
    // Ver si en los parámetros se indica que sea sólo de lectura
    this.route.queryParams.subscribe((params) => {
      this.readOnly = params['readOnly'] == 'true' ? true: false;
      this.readOnly = params['new'] == true ? false: this.readOnly;
      this.desHabilita();
    })
  }

  onEditarClick() {
    this.desHabilita(false);
  }

  onCancelarClick() {
    this.curso$.pipe(take(1)).subscribe((curso) =>
      curso ? this.cancelaEdicion(curso) : null
    )
  }

  // Eliminar el registro del Curso
  onEliminarClick() {
    this.curso$.pipe(take(1)).subscribe((curso) => {
      const dialogRef = this.dialog.open(ConfirmarBorradoCursosComponent, {
        width: '400px',
        data: curso
      });
      // Al cerrar..
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(triggerEliminarCurso(result as CursoItem));
        }
      })
    })
  }

  // Desinscribir a un alumno
  onBorrarClick(alumno: AlumnoItem) {}

  onNgSubmit() {
    const curso = this.formCurso.value as CursoItem;
    if (this.cursoId) {
      // Curso Existente
      this.store.dispatch(triggerGuardarCurso({curso: {...curso, id: this.cursoId}}));
    } else {
      // Curso nuevo
      this.store.dispatch(triggerCrearCurso({curso}));
    };
    // Pone todo en modo lectura
    this.desHabilita(true);
  }

}
