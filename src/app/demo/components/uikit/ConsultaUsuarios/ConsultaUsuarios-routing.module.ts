import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConsultaUsuariosDemoComponent } from './ConsultaUsuarios.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ConsultaUsuariosDemoComponent }
	])],
	exports: [RouterModule]
})
export class ConsultaUsuariosDemoRoutingModule { }
