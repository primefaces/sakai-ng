import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms';
import { NotaCompraRoutingModule } from './nota-compra-routing.module';
import { NotaCompraGrupoComponent } from './components/nota-compra-grupo/nota-compra-grupo.component';
import { NotaCompraDetalleComponent } from './components/nota-compra-detalle/nota-compra-detalle.component';
import { NotaCompraAddComponent } from './components/nota-compra-add/nota-compra-add.component';
import { NotaCompraFormComponent } from './components/nota-compra-form/nota-compra-form.component';
import { NotaCompraEstadoProveedorComponent } from './components/nota-compra-estado-proveedor/nota-compra-estado-proveedor.component';


@NgModule({
  declarations: [
    //NotaCompraListComponent,
     NotaCompraGrupoComponent,
     NotaCompraDetalleComponent,
     NotaCompraAddComponent,
     NotaCompraFormComponent,
     NotaCompraEstadoProveedorComponent
  ],
  imports: [
    CommonModule,
    NotaCompraRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class NotaCompraModule { }
