import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaOficialesDemoComponent } from './ListaOficiales.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListaOficialesDemoComponent }
	])],
	exports: [RouterModule]
})
export class ListaOficialesDemoRoutingModule { }
