import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {GenericViewComponent} from "./entries/generic-view/generic-view.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'userview', component: GenericViewComponent },
        { path: 'roomview', component: GenericViewComponent },
        { path: 'courseview', component: GenericViewComponent }
    ])],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
