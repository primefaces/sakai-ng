import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {GenericViewComponent} from "./entries/generic-view/generic-view.component";
import {AuthGuardAdmin} from "../../guards/access-guards";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'userview', component: GenericViewComponent, canActivate: [AuthGuardAdmin]},
        { path: 'roomview', component: GenericViewComponent },
        { path: 'courseview', component: GenericViewComponent }
    ])],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
