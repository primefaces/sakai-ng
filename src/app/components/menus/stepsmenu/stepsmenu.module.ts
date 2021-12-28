import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PaymentDemoComponent } from './paymentdemo.component';
import { SeatDemoComponent } from './seatdemo.component';
import { PersonalDemoComponent } from './personaldemo.component';
import { ConfirmationDemoComponent } from './confirmationdemo.component';
// import { MenusDemoComponent } from '../menusdemo.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
        // {path:'',component: MenusDemoComponent, children:[
				// {path:'', redirectTo: 'personal', pathMatch: 'full'},
				// {path: 'personal', component: PersonalDemoComponent},
				// {path: 'confirmation', component: ConfirmationDemoComponent},
				// {path: 'seat', component: SeatDemoComponent},
				// {path: 'payment', component: PaymentDemoComponent}
        // ]}
    ])
  ],
  exports: [RouterModule]
})
export class MenudemoModule { }
