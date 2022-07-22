import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FloatLabelDemoComponent } from './floatlabeldemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FloatLabelDemoComponent }
    ])],
    exports: [RouterModule]
})
export class FloatlabelDemoRoutingModule { }
