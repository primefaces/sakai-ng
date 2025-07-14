import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaListComponent } from './components/categoria-list/categoria-list.component';

const routes: Routes = [
  { path: '', component: CategoriaListComponent },
  //{ path: 'nuevo', component: CategoriaFormComponent },
  //{ path: 'editar/:id', component: CategoriaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
