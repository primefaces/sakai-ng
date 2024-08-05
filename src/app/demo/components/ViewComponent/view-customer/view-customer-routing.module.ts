import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewCustomerComponent } from './view-customer.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ViewCustomerComponent }
    ])],
    exports: [RouterModule]
})
export class ViewCustomerRoutingModule { }
