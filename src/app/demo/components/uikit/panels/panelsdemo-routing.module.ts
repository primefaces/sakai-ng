import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelsDemoComponent } from './panelsdemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PanelsDemoComponent }
    ])],
    exports: [RouterModule]
})
export class PanelsDemoRoutingModule { }
