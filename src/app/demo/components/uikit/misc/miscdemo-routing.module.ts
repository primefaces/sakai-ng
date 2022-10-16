import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MiscDemoComponent } from './miscdemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MiscDemoComponent }
	])],
	exports: [RouterModule]
})
export class MiscDemoRoutingModule { }
