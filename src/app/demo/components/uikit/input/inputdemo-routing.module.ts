import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputDemoComponent } from './inputdemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InputDemoComponent }
	])],
	exports: [RouterModule]
})
export class InputDemoRoutingModule { }
