import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsComponent } from './charts.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ChartsComponent }
    ])],
    exports: [RouterModule]
})
export class ChartsRoutingModule { }
