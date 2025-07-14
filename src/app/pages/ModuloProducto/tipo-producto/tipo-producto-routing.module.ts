import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoProductoListComponent } from './components/tipo-producto-list/tipo-producto-list.component';

const routes: Routes = [
  { path: '', component: TipoProductoListComponent }
  //{ path: 'nuevo', component: CategoriaFormComponent },
  //{ path: 'editar/:id', component: CategoriaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoProductoRoutingModule { }
