import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module'; 
import { ConfirmationService, MessageService } from 'primeng/api'; 

import { FormsModule } from '@angular/forms';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorListComponent } from './components/proveedor-list/proveedor-list.component';
import { ProveedorFormComponent } from './components/proveedor-form/proveedor-form.component';


@NgModule({
  declarations: [
    ProveedorListComponent,
    ProveedorFormComponent
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class ProveedorModule { }
