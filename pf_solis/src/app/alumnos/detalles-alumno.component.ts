import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlumnoItem } from './alumno-item';
import * as fromStore from './store';
import { cargarAlumno } from './store/alumnos.actions';
import { selectorAlumnoActual } from './store/alumnos.selectors';

@Component({
  selector: 'app-detalles-alumno',
  templateUrl: './detalles-alumno.component.html',
  styleUrls: ['./detalles-alumno.component.css']
})
export class DetallesAlumnoComponent implements OnInit {

  readOnly: boolean = true; // Inicia deshabilitado
  
  formAlumno: FormGroup = new FormGroup(
    {
      matricula: new FormControl({value: '', disabled: this.readOnly}, [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl({value:'', disabled: this.readOnly}, [Validators.required]),
      apellidos: new FormControl({value: '', disabled: this.readOnly}, [Validators.required]),
      email: new FormControl({value: '', disabled: this.readOnly}, [Validators.required, Validators.email]),
      fechaNacimiento: new FormControl({value: '', disabled: this.readOnly}, [Validators.required]),
      genero: new FormControl({value: '', disabled: this.readOnly})
    }
  )

  displayedColumns: string[] = ['id', 'nombre', 'fechaInicio', 'fechaFin', 'action'];

  controls = {
    matricula: this.formAlumno.get('matricula') as FormControl,
    nombre: this.formAlumno.get('nombre') as FormControl,
    apellidos: this.formAlumno.get('apellidos') as FormControl,
    email: this.formAlumno.get('email') as FormControl,
    fechaNacimiento: this.formAlumno.get('fechaNacimiento') as FormControl,
    genero: this.formAlumno.get('genero') as FormControl
  }

  constructor(
    private store: Store,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((map: ParamMap) => {
      // Se obtiene el Id de la ruta
      this.store.dispatch(cargarAlumno({id: Number(map.get('id'))}));
      // Se extrae la información de la BD
      // this.alumnosService.getAlumno(Number(this.alumnoId)).subscribe((resp) => {
      //   this.alumno = {...resp, cursos: []};
      //   // Se le asigna un valor a cada campo
      //   this.controls.matricula.setValue(this.alumno.matricula);
      //   this.controls.nombre.setValue(this.alumno.nombre);
      //   this.controls.apellidos.setValue(this.alumno.apellidos);
      //   this.controls.email.setValue(this.alumno.email);
      //   this.controls.fechaNacimiento.setValue(formatDate(this.alumno.fechaNacimiento, 'yyyy-MM-dd', 'en'));
      //   this.controls.genero.setValue(this.alumno.genero);
      // })

      // this.store.select(selectorAlumnoActual).subscribe((resp) => {
      //   this.alumno = {...resp, cursos: []};
      //   // Se le asigna un valor a cada campo
      //   this.controls.matricula.setValue(this.alumno.matricula);
      //   this.controls.nombre.setValue(this.alumno.nombre);
      //   this.controls.apellidos.setValue(this.alumno.apellidos);
      //   this.controls.email.setValue(this.alumno.email);
      //   this.controls.fechaNacimiento.setValue(formatDate(this.alumno.fechaNacimiento, 'yyyy-MM-dd', 'en'));
      //   this.controls.genero.setValue(this.alumno.genero);
      // })

    })

    // this.route.queryParams.subscribe((params) => {
    //   // ¡¡ Cuidado con esta conversión, por alguna razón no funciona si se quiere asignar directamente el valor
    //   // convertido con "as unknown as boolean" !!
    //   this.readOnly = params['readOnly'] == 'true' ? true : false;
    //   this.desHabilita();
    // })
  }

}
