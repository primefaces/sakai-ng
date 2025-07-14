import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoEnvaseListComponent } from './components/producto-envase-list/producto-envase-list.component';

const routes: Routes = [
   { path: '', component: ProductoEnvaseListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoEnvaseRoutingModule { }
