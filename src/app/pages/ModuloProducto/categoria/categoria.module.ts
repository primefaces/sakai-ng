import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';  

import { FormsModule } from '@angular/forms';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { CategoriaListComponent } from './components/categoria-list/categoria-list.component';
//import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    CategoriaFormComponent,
    CategoriaListComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    //ConfirmationService,
    //MessageService
  ]
})
export class CategoriaModule { }
