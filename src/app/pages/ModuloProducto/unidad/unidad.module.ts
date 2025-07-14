import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms'; // <-- Asegúrate de importarlo
import { UnidadRoutingModule } from './unidad-routing.module';
import { UnidadListComponent } from './components/unidad-list/unidad-list.component';
import { UnidadFormComponent } from './components/unidad-form/unidad-form.component';


@NgModule({
  declarations: [
    UnidadListComponent,
    UnidadFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UnidadRoutingModule,
    SharedModule,
  ],
  exports: [UnidadFormComponent],
})
export class UnidadModule { }

