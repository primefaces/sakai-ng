import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoFormComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class ProductoModule { }
