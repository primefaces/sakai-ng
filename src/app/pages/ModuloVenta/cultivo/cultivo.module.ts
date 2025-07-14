import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms';
import { CultivoRoutingModule } from './cultivo-routing.module';
import { CultivoListComponent } from './components/cultivo-list/cultivo-list.component';
import { CultivoFormComponent } from './components/cultivo-form/cultivo-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    CultivoListComponent,
    CultivoFormComponent
  ],
  imports: [
    CommonModule,
    CultivoRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class CultivoModule { }
