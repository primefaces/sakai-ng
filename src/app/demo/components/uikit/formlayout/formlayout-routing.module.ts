import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormLayoutComponent } from './formlayout.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FormLayoutComponent }
    ])],
    exports: [RouterModule]
})
export class FormlayoutRoutingModule { }
