import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotaDevolucionListComponent } from './components/nota-devolucion-list/nota-devolucion-list.component';
import { NotaDevolucionGrupoComponent } from './components/nota-devolucion-grupo/nota-devolucion-grupo.component';

const routes: Routes = [
    { path: '', component: NotaDevolucionListComponent },
    { path: 'grupo', component: NotaDevolucionGrupoComponent },
    { path: 'grupo/:optionNota', component: NotaDevolucionGrupoComponent },
    { path: 'grupo/:CodigoCliente/:optionNota', component: NotaDevolucionGrupoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotaDevolucionRoutingModule { }
