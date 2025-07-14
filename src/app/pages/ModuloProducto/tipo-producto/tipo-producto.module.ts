import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms';
import { TipoProductoRoutingModule } from './tipo-producto-routing.module';
import { TipoProductoListComponent } from './components/tipo-producto-list/tipo-producto-list.component';
import { TipoProductoFormComponent } from './components/tipo-producto-form/tipo-producto-form.component';


@NgModule({
  declarations: [
    TipoProductoListComponent,
    TipoProductoFormComponent
  ],
  imports: [
    CommonModule,
    TipoProductoRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class TipoProductoModule { }
