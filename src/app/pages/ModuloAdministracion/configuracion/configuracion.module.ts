import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfiguracionFormComponent } from './components/configuracion-form/configuracion-form.component';


@NgModule({
  declarations: [
    ConfiguracionFormComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule, 
    SharedModule,
    FormsModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class ConfiguracionModule { }
