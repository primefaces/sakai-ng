import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module'; 
import { ConfirmationService, MessageService } from 'primeng/api'; 

import { FormsModule } from '@angular/forms';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';

@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteFormComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class ClienteModule { }
