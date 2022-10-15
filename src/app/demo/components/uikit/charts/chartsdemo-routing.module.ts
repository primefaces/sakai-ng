import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsDemoComponent } from './chartsdemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ChartsDemoComponent }
	])],
	exports: [RouterModule]
})
export class ChartsDemoRoutingModule { }
