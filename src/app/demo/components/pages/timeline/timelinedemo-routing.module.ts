import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimelineDemoComponent } from './timelinedemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TimelineDemoComponent }
    ])],
    exports: [RouterModule]
})
export class TimelineDemoRoutingModule { }
