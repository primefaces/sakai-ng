import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvalidStateDemoComponent } from './invalidstatedemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: InvalidStateDemoComponent }
    ])],
    exports: [RouterModule]
})
export class InvalidStateDemoRoutingModule { }
