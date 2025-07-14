import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';

import { FormsModule } from '@angular/forms'; 

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthProfileComponent } from './components/auth-profile/auth-profile.component';
//import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthUpdateProfileComponent } from './components/auth-update-profile/auth-update-profile.component';



@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthProfileComponent,
    AuthUpdateProfileComponent
    //AuthUpdatePasswordComponent,
    //AuthProfileComponent,
    //AuthUpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule,
    AppFloatingConfigurator
  ],
  providers: [
    //ConfirmationService,
    //MessageService
  ],
  exports: [ // Exporta los componentes si los necesitas en otros módulos
    //AuthLoginComponent,
    AuthProfileComponent,
    //AuthUpdateProfileComponent,
    //AuthUpdatePasswordComponent
  ]
})
export class AuthModule { }
