import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlaysDemoComponent } from './overlaysdemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: OverlaysDemoComponent }
	])],
	exports: [RouterModule]
})
export class OverlaysDemoRoutingModule { }
