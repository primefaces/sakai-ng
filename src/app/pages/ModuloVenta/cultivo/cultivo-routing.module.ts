import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CultivoListComponent } from './components/cultivo-list/cultivo-list.component';

const routes: Routes = [
   { path: '', component: CultivoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CultivoRoutingModule { }
