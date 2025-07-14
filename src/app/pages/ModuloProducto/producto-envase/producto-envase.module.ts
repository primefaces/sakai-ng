import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms';
import { ProductoEnvaseRoutingModule } from './producto-envase-routing.module';
import { ProductoEnvaseListComponent } from './components/producto-envase-list/producto-envase-list.component';
import { ProductoEnvaseFormComponent } from './components/producto-envase-form/producto-envase-form.component';


@NgModule({
  declarations: [
    ProductoEnvaseListComponent,
    ProductoEnvaseFormComponent
  ],
  imports: [
    CommonModule,
    ProductoEnvaseRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ProductoEnvaseModule { }
