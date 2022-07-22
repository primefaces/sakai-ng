import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmptyDemoComponent } from './emptydemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EmptyDemoComponent }
    ])],
    exports: [RouterModule]
})
export class EmptyDemoRoutingModule { }
