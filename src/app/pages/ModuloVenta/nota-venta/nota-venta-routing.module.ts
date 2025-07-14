import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotaVentaListComponent } from './components/nota-venta-list/nota-venta-list.component';
import { NotaVentaGrupoComponent } from './components/nota-venta-grupo/nota-venta-grupo.component';

const routes: Routes = [
  { path: '', component: NotaVentaListComponent },
  { path: 'grupo', component: NotaVentaGrupoComponent },
  { path: 'grupo/:CodigoCliente', component: NotaVentaGrupoComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotaVentaRoutingModule { }
