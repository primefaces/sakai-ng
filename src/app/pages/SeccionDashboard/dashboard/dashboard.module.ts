import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module'; 

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPrincipalComponent } from './components/dashboard-principal/dashboard-principal.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DashboardStatsWhidgetComponent } from './components/dashboard-stats-whidget/dashboard-stats-whidget.component';


@NgModule({
  declarations: [
    DashboardPrincipalComponent,
    DashboardStatsWhidgetComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class DashboardModule { }
