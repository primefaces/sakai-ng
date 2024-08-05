import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewDashboardComponent } from './view-dashboard.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ViewDashboardComponent }
    ])],
    exports: [RouterModule]
})
export class ViewDashboardRoutingModule { }
