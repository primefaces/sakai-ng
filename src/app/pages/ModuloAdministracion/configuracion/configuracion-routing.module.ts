import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionFormComponent } from './components/configuracion-form/configuracion-form.component';

const routes: Routes = [
  { path: '', component: ConfiguracionFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
