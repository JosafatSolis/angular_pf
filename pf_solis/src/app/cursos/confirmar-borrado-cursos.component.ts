import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CursoItem } from './curso-item';

@Component({
  selector: 'app-confirmar-borrado-cursos',
  templateUrl: './confirmar-borrado-cursos.component.html',
  styleUrls: ['./confirmar-borrado-cursos.component.css']
})
export class ConfirmarBorradoCursosComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarBorradoCursosComponent>,
    @Inject(MAT_DIALOG_DATA) public curso: CursoItem
    ) { }

  ngOnInit(): void {
  }

  onClickCancelar() {
    this.dialogRef.close();
  }

}
