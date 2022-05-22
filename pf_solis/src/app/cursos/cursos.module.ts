import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromCursosStore from './store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CursosRoutingModule,
    StoreModule.forFeature(fromCursosStore.cursosStoreFeatureKey, fromCursosStore.reducers, { metaReducers: fromCursosStore.metaReducers })
  ]
})
export class CursosModule { }
