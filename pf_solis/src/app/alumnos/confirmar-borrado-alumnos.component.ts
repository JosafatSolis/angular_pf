import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnoItem } from './alumno-item';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dialog-confirmar-borrado-component',
  templateUrl: './confirmar-borrado-alumnos.component.html',
  styleUrls: ['./confirmar-borrado-alumnos.component.css'],
})
export class ConfirmarBorradoAlumnosComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarBorradoAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) public alumno: AlumnoItem
  ) {}

  ngOnInit(): void {}

  onClickCancelar() {
    this.dialogRef.close();
  }
}
