import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnoItem } from './alumno-item';
import { Store } from '@ngrx/store';
import * as fromStore from '../session/root-store';

@Component({
  selector: 'app-dialog-confirmar-borrado-component',
  templateUrl: './dialog-confirmar-borrado-component.component.html',
  styleUrls: ['./dialog-confirmar-borrado-component.component.css'],
})
export class DialogConfirmarBorradoComponent implements OnInit {
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<DialogConfirmarBorradoComponent>,
    @Inject(MAT_DIALOG_DATA) public alumno: AlumnoItem
  ) {}

  ngOnInit(): void {}

  onClickCancelar() {
    this.dialogRef.close();
  }
}
