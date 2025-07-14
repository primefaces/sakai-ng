import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionListComponent } from './components/gestion-list/gestion-list.component';

const routes: Routes = [
  { path: '', component: GestionListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
