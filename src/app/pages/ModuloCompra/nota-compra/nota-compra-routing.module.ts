import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotaCompraListComponent } from './components/nota-compra-list/nota-compra-list.component';
import { NotaCompraGrupoComponent } from './components/nota-compra-grupo/nota-compra-grupo.component';

const routes: Routes = [
  { path: '', component: NotaCompraListComponent },
  { path: 'grupo', component: NotaCompraGrupoComponent },
  { path: 'grupo/:CodigoProveedor', component: NotaCompraGrupoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotaCompraRoutingModule { }
