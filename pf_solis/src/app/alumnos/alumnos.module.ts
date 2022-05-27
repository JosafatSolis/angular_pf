import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { SharedDetailsModule } from '../shared/shared-details.module';
import { SharedListsModule } from '../shared/shared-lists.module';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAlumnosStore from './store';

import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AlumnosEffects } from './store/alumnos.effects';
import { ListaAlumnosComponent } from './lista-alumnos.component';
import { DialogConfirmarBorradoComponent } from './dialog-confirmar-borrado-component.component';
import { DetallesAlumnoComponent } from './detalles-alumno.component';

//import * as fromAlumnos from './reducers/alumnos.reducer';

@NgModule({
  declarations: [
    ListaAlumnosComponent,
    DialogConfirmarBorradoComponent,
    DetallesAlumnoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedDetailsModule,
    SharedListsModule,
    AlumnosRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(fromAlumnosStore.alumnosStoreFeatureKey, fromAlumnosStore.reducers, { metaReducers: fromAlumnosStore.metaReducers }),
    EffectsModule.forFeature([AlumnosEffects])
  ]
})
export class AlumnosModule { }
