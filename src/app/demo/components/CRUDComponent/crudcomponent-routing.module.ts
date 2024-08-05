import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
         { path: 'AddCustomer', loadChildren: ()  => import('./createcustomer/createcustomer.module').then(m=>m.CreateCustomerModule)},
        // { path: 'ViewDashboard', loadChildren: () => import('./view-dashboard/view-dashboard.module').then(m=>m.ViewDashboardModule)},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CrudcomponentRoutingModule { }
