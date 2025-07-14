import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioListComponent } from './components/inventario-list/inventario-list.component';

const routes: Routes = [
  { path: '', component: InventarioListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
