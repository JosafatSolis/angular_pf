import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAlumnosStore from './store';

//import * as fromAlumnos from './reducers/alumnos.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    StoreModule.forFeature(fromAlumnosStore.alumnosStoreFeatureKey, fromAlumnosStore.reducers, { metaReducers: fromAlumnosStore.metaReducers })
  ]
})
export class AlumnosModule { }
