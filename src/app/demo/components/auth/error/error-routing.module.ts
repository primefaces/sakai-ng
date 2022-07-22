import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ErrorComponent }
    ])],
    exports: [RouterModule]
})
export class ErrorRoutingModule { }
