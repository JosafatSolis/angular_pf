import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromCursosStore from './store';
import { ListaCursosComponent } from './lista-cursos.component';
import { DetallesCursoComponent } from './detalles-curso.component';
import { ConfirmarBorradoCursosComponent } from './confirmar-borrado-cursos.component';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './store/cursos.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { SharedDetailsModule } from '../shared/shared-details.module';
import { SharedListsModule } from '../shared/shared-lists.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListaCursosComponent,
    ConfirmarBorradoCursosComponent,
    DetallesCursoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedDetailsModule,
    SharedListsModule,
    CursosRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(fromCursosStore.cursosStoreFeatureKey, fromCursosStore.reducers, { metaReducers: fromCursosStore.metaReducers }),
    EffectsModule.forFeature([CursosEffects])
  ]
})
export class CursosModule { }
