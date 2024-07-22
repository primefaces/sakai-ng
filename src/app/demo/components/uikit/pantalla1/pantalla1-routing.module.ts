import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { pantalla1DemoComponent } from './pantalla1.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: pantalla1DemoComponent }
	])],
	exports: [RouterModule]
})
export class pantalla1DemoRoutingModule { }
