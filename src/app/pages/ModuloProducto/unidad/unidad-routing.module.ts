import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadListComponent } from './components/unidad-list/unidad-list.component';

const routes: Routes = [
  { path: '', component: UnidadListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadRoutingModule {}
