import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListDemoComponent } from './listdemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListDemoComponent }
    ])],
    exports: [RouterModule]
})
export class ListDemoRoutingModule { }
