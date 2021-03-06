import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesAlumnoComponent } from '../alumnos/detalles-alumno.component';
import { ListaAlumnosComponent } from '../alumnos/lista-alumnos.component';
import { DetallesCursoComponent } from '../cursos/detalles-curso.component';
import { ListaCursosComponent } from '../cursos/lista-cursos.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'alumnos', component: ListaAlumnosComponent },
      { path: 'alumnos/:id', component: DetallesAlumnoComponent},
      { path: 'cursos', component: ListaCursosComponent },
      { path: 'cursos/:id', component: DetallesCursoComponent },
      { path: '', redirectTo: 'alumnos', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
