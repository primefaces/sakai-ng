import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileDemoComponent } from './filedemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FileDemoComponent }
	])],
	exports: [RouterModule]
})
export class FileDemoRoutingModule { }
