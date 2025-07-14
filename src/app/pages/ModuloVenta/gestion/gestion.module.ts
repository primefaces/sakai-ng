import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms';

import { GestionRoutingModule } from './gestion-routing.module';
import { GestionListComponent } from './components/gestion-list/gestion-list.component';
import { GestionFormComponent } from './components/gestion-form/gestion-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    GestionListComponent,
    GestionFormComponent
  ],
  imports: [
    CommonModule,
    GestionRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class GestionModule { }
