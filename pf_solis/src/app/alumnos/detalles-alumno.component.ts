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
import { CursoItem } from '../cursos/curso-item';
import { AlumnoItem } from './alumno-item';
import { ConfirmarBorradoAlumnosComponent } from './confirmar-borrado-alumnos.component';
import {
  alumnoActualizado,
  triggerCargarAlumno,
  triggerCrearAlumno,
  trigguerEliminarAlumno,
  triggerGuardarAlumno,
} from './store/alumnos.actions';
import { selectorAlumnoActual } from './store/alumnos.selectors';

@Component({
  selector: 'app-detalles-alumno',
  templateUrl: './detalles-alumno.component.html',
  styleUrls: ['./detalles-alumno.component.css'],
})
export class DetallesAlumnoComponent implements OnInit {

  constructor(
    private store: Store, 
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    ) {}

  readOnly: boolean = true; // Inicia deshabilitado
  alumno$!: Observable<AlumnoItem | null>;
  alumnoId!: string;

  dataSource = new MatTableDataSource<CursoItem>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // En la tabla Cursos Inscritos
  displayedColumns: string[] = ['id', 'nombre', 'fechaInicio', 'fechaFin', 'action',];

  formAlumno: FormGroup = new FormGroup({
    matricula: new FormControl({ value: '', disabled: this.readOnly }, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    nombre: new FormControl({ value: '', disabled: this.readOnly }, [
      Validators.required,
    ]),
    apellidos: new FormControl({ value: '', disabled: this.readOnly }, [
      Validators.required,
    ]),
    email: new FormControl({ value: '', disabled: this.readOnly }, [
      Validators.required,
      Validators.email,
    ]),
    fechaNacimiento: new FormControl({ value: '', disabled: this.readOnly }, [
      Validators.required,
    ]),
    genero: new FormControl({ value: '', disabled: this.readOnly }),
  });

  controles = {
    matricula: this.formAlumno.get('matricula') as FormControl,
    nombre: this.formAlumno.get('nombre') as FormControl,
    apellidos: this.formAlumno.get('apellidos') as FormControl,
    email: this.formAlumno.get('email') as FormControl,
    fechaNacimiento: this.formAlumno.get('fechaNacimiento') as FormControl,
    genero: this.formAlumno.get('genero') as FormControl,
  };

  desHabilita(nvoValor?: boolean) {
    if (typeof nvoValor != 'undefined') {
      this.readOnly = nvoValor;
    }
    this.readOnly
      ? this.controles.matricula.disable()
      : this.controles.matricula.enable();
    this.readOnly
      ? this.controles.nombre.disable()
      : this.controles.nombre.enable();
    this.readOnly
      ? this.controles.apellidos.disable()
      : this.controles.apellidos.enable();
    this.readOnly
      ? this.controles.email.disable()
      : this.controles.email.enable();
    this.readOnly
      ? this.controles.fechaNacimiento.disable()
      : this.controles.fechaNacimiento.enable();
    this.readOnly
      ? this.controles.genero.disable()
      : this.controles.genero.enable();
  }

  cancelaEdicion(alumno: AlumnoItem) {
    this.formAlumno.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      apellidos: alumno.apellidos,
      email: alumno.email,
      fechaNacimiento: formatDate(alumno.fechaNacimiento, 'yyyy-MM-dd', 'en'),
      genero: alumno.genero,
    });
    this.desHabilita(true);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm: ParamMap) => {
      // Se obtiene el Id de la ruta
      let id = String(pm.get('id'));
      // Se despacha el evento según sea o no un ítem existente
      if (!id) {
        this.store.dispatch(
          alumnoActualizado({
            alumno: {
              id: '',
              matricula: 0,
              nombre: '',
              apellidos: '',
              email: '',
              fechaNacimiento: new Date(),
              genero: '',
              cursos: [],
            },
          })
        );
      } else {
        this.store.dispatch(triggerCargarAlumno({ id }));
      }
    });
    // Se asocia el valor del store al alumno actual
    this.alumno$ = this.store.select(selectorAlumnoActual);
    // Cada que cambie el alumno actual, se actualiza el valor por default de los controles
    this.alumno$.subscribe((alumno) => {
      if (alumno) {
        this.alumnoId = alumno.id;
        // Se le asigna un valor a cada campo
        this.controles.matricula.setValue(alumno.matricula);
        this.controles.nombre.setValue(alumno.nombre);
        this.controles.apellidos.setValue(alumno.apellidos);
        this.controles.email.setValue(alumno.email);
        this.controles.fechaNacimiento.setValue(
          formatDate(alumno.fechaNacimiento, 'yyyy-MM-dd', 'en')
        );
        this.controles.genero.setValue(alumno.genero);
        // Carga los cursos
        this.dataSource.data = alumno.cursos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
    // Ver si en los parámetros se indica que sea sólo de lectura
    this.route.queryParams.subscribe((params) => {
      // ¡¡ Cuidado con esta conversión, por alguna razón no funciona si se quiere asignar directamente el valor
      // convertido con "as unknown as boolean" !!
      this.readOnly = params['readOnly'] == 'true' ? true : false;
      this.readOnly = params['new'] == 'true' ? false : this.readOnly;
      this.desHabilita();
    });
  }

  onEditarClick() {
    this.desHabilita(false);
  }

  onCancelarClick() {
    // Se utiliza el take(1) para que sólo tenga efecto 1 vez por clic
    this.alumno$.pipe(take(1)).subscribe((alumno) =>
      alumno ? this.cancelaEdicion(alumno) : null
    );
  }

  // Eliminar el registro del Alumno
  onEliminarClick() {
    this.alumno$.pipe(take(1)).subscribe((alumno) => {
      const dialogRef = this.dialog.open(ConfirmarBorradoAlumnosComponent, {
        width: '400px',
        data: alumno
      });
      // Una vez que se cierra..
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Se dio clic en ACEPTAR
          this.store.dispatch(trigguerEliminarAlumno(result as AlumnoItem));
          this.router.navigate(['home', 'alumnos']);
        }
      })
    })
  }

  // Desinscribir un curso
  onBorrarClick(element: CursoItem) {}

  // Clic en botón Guardar cambios del Alumno
  onNgSubmit() {
    // Como el id no está en el form, hay que agregarlo:
    const alumno = this.formAlumno.value as AlumnoItem;
    if (this.alumnoId) {
      // Alumno existente
      this.store.dispatch(
        triggerGuardarAlumno({ alumno: { ...alumno, id: this.alumnoId } })
      );
    } else {
      // Alumno nuevo
      this.store.dispatch(
        triggerCrearAlumno({ alumno })
      )
    };
    // Pone todo en modo lectura
    this.desHabilita(true);
  }
}
