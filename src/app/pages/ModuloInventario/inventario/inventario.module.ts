import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms';
import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioListComponent } from './components/inventario-list/inventario-list.component';


@NgModule({
  declarations: [
    InventarioListComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class InventarioModule { }
