import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'ViewCustomer', loadChildren: ()  => import('./view-customer/view-customer.module').then(m=>m.ViewCustomerModule)},
        { path: 'ViewDashboard', loadChildren: () => import('./view-dashboard/view-dashboard.module').then(m=>m.ViewDashboardModule)},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ViewcomponentRoutingModule { }
