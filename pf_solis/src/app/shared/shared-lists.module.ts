import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports:[MatTableModule, MatDialogModule, MatCardModule, MatButtonModule]
})
export class SharedListsModule { }
