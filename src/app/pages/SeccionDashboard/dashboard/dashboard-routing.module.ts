import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPrincipalComponent } from './components/dashboard-principal/dashboard-principal.component';

const routes: Routes = [
  { path: '', component: DashboardPrincipalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
