import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms';
import { NotaDevolucionRoutingModule } from './nota-devolucion-routing.module';
import { NotaDevolucionGrupoComponent } from './components/nota-devolucion-grupo/nota-devolucion-grupo.component';
import { NotaDevolucionAddComponent } from './components/nota-devolucion-add/nota-devolucion-add.component';
import { NotaDevolucionDetalleComponent } from './components/nota-devolucion-detalle/nota-devolucion-detalle.component';
import { NotaDevolucionFormComponent } from './components/nota-devolucion-form/nota-devolucion-form.component';
import { NotaDevolucionEstadoClienteComponent } from './components/nota-devolucion-estado-cliente/nota-devolucion-estado-cliente.component';


@NgModule({
  declarations: [
     NotaDevolucionGrupoComponent,
     NotaDevolucionDetalleComponent,
     NotaDevolucionAddComponent,
     NotaDevolucionFormComponent,
     NotaDevolucionEstadoClienteComponent
  ],
  imports: [
    CommonModule,
    NotaDevolucionRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class NotaDevolucionModule { }
