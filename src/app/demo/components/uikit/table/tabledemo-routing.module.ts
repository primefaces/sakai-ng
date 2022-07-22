import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableDemoComponent } from './tabledemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TableDemoComponent }
    ])],
    exports: [RouterModule]
})
export class TableDemoRoutingModule { }
