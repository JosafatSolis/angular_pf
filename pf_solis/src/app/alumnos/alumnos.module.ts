import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAlumnosStore from './store';

import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AlumnosEffects } from './store/alumnos.effects';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';

//import * as fromAlumnos from './reducers/alumnos.reducer';

@NgModule({
  declarations: [
    ListaAlumnosComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(fromAlumnosStore.alumnosStoreFeatureKey, fromAlumnosStore.reducers, { metaReducers: fromAlumnosStore.metaReducers }),
    EffectsModule.forFeature([AlumnosEffects])
  ]
})
export class AlumnosModule { }
