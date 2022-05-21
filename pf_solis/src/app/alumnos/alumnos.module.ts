import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAlumnos from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    StoreModule.forFeature(fromAlumnos.alumnosFeatureKey, fromAlumnos.reducers, { metaReducers: fromAlumnos.metaReducers })
  ]
})
export class AlumnosModule { }
