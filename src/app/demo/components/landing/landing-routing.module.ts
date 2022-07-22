import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LandingComponent }
    ])],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
