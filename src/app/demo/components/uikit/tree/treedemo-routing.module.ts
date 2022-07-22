import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreeDemoComponent } from './treedemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TreeDemoComponent }
	])],
	exports: [RouterModule]
})
export class TreeDemoRoutingModule { }
