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
import * as fromStore from './store';
import {
  alumnoActualizado,
  cargarAlumno,
  crearAlumno,
  eliminarAlumno,
  guardarAlumno,
} from './store/alumnos.actions';
import { selectorAlumnoActual } from './store/alumnos.selectors';

@Component({
  selector: 'app-detalles-alumno',
  templateUrl: './detalles-alumno.component.html',
  styleUrls: ['./detalles-alumno.component.css'],
})
export class DetallesAlumnoComponent implements OnInit {
  readOnly: boolean = true; // Inicia deshabilitado
  alumno$!: Observable<AlumnoItem | null>;
  alumnoId!: number;

  dataSource = new MatTableDataSource<CursoItem>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

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

  displayedColumns: string[] = [
    'id',
    'nombre',
    'fechaInicio',
    'fechaFin',
    'action',
  ];

  controls = {
    matricula: this.formAlumno.get('matricula') as FormControl,
    nombre: this.formAlumno.get('nombre') as FormControl,
    apellidos: this.formAlumno.get('apellidos') as FormControl,
    email: this.formAlumno.get('email') as FormControl,
    fechaNacimiento: this.formAlumno.get('fechaNacimiento') as FormControl,
    genero: this.formAlumno.get('genero') as FormControl,
  };

  desHabilita() {
    this.readOnly
      ? this.controls.matricula.disable()
      : this.controls.matricula.enable();
    this.readOnly
      ? this.controls.nombre.disable()
      : this.controls.nombre.enable();
    this.readOnly
      ? this.controls.apellidos.disable()
      : this.controls.apellidos.enable();
    this.readOnly
      ? this.controls.email.disable()
      : this.controls.email.enable();
    this.readOnly
      ? this.controls.fechaNacimiento.disable()
      : this.controls.fechaNacimiento.enable();
    this.readOnly
      ? this.controls.genero.disable()
      : this.controls.genero.enable();
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
    //this.formAlumno.reset(this.formAlumno.value);
    this.readOnly = true;
    this.desHabilita();
  }

  constructor(
    private store: Store, 
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((map: ParamMap) => {
      // Se obtiene el Id de la ruta
      let id = Number(map.get('id'));
      if (id == 0) {
        this.store.dispatch(
          alumnoActualizado({
            alumno: {
              id: 0,
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
        this.store.dispatch(cargarAlumno({ id }));
      }
    });
    // Se asocia el valor del store
    this.alumno$ = this.store.select(selectorAlumnoActual);
    // Cada que cambie, se actualiza el valor por default de los controles
    this.alumno$.subscribe((alumno) => {
      if (alumno) {
        this.alumnoId = alumno.id;
        // Se le asigna un valor a cada campo
        this.controls.matricula.setValue(alumno.matricula);
        this.controls.nombre.setValue(alumno.nombre);
        this.controls.apellidos.setValue(alumno.apellidos);
        this.controls.email.setValue(alumno.email);
        this.controls.fechaNacimiento.setValue(
          formatDate(alumno.fechaNacimiento, 'yyyy-MM-dd', 'en')
        );
        this.controls.genero.setValue(alumno.genero);
        // Carga los cursos
        this.dataSource.data = alumno.cursos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
    this.route.queryParams.subscribe((params) => {
      // ¡¡ Cuidado con esta conversión, por alguna razón no funciona si se quiere asignar directamente el valor
      // convertido con "as unknown as boolean" !!
      this.readOnly = params['readOnly'] == 'true' ? true : false;
      this.readOnly = params['new'] == 'true' ? false : this.readOnly;
      this.desHabilita();
    });
  }

  onEditarClick() {
    this.readOnly = false;
    this.desHabilita();
  }

  onCancelarClick() {
    this.alumno$.pipe(take(1)).subscribe((alumno) => {
      alumno ? this.cancelaEdicion(alumno) : null;
    });
  }

  // Eliminar el registro del Alumno
  onEliminarClick() {
    this.alumno$.pipe(take(1)).subscribe((alumno) => {
      const dialogRef = this.dialog.open(ConfirmarBorradoAlumnosComponent, {
        width: '400px',
        data: alumno
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(eliminarAlumno(result as AlumnoItem));
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
        guardarAlumno({ alumno: { ...alumno, id: this.alumnoId } })
      );
    } else {
      // Alumno nuevo
      this.store.dispatch(
        crearAlumno({ alumno })
      )
    };
    this.readOnly = true;
    this.desHabilita();
  }
}
