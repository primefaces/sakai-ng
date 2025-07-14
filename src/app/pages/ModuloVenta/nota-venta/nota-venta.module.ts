import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms';

import { NotaVentaRoutingModule } from './nota-venta-routing.module';
import { NotaVentaGrupoComponent } from './components/nota-venta-grupo/nota-venta-grupo.component';
import { NotaVentaDetalleComponent } from './components/nota-venta-detalle/nota-venta-detalle.component';
import { NotaVentaAddComponent } from './components/nota-venta-add/nota-venta-add.component';
import { NotaVentaFormComponent } from './components/nota-venta-form/nota-venta-form.component';
import { NotaVentaEstadoClienteComponent } from './components/nota-venta-estado-cliente/nota-venta-estado-cliente.component';

@NgModule({
  declarations: [
    NotaVentaGrupoComponent,
    NotaVentaDetalleComponent,
    NotaVentaAddComponent,
    NotaVentaFormComponent,
    NotaVentaEstadoClienteComponent
  ],
  imports: [
    CommonModule,
    NotaVentaRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
     //ConfirmationService,
     //MessageService
  ]
})
export class NotaVentaModule { }
