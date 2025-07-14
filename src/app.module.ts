import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app.routes';
import {AppConfigModule} from './app.config';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import { authInterceptorProviders } from './auth-interceptor.interceptor';
// Importa MessageService de PrimeNG
import { MessageService } from 'primeng/api';
import { AuthModule } from './app/pages/ModuloAuth/auth/auth.module';
import { MessagesModule } from 'primeng/messages';  // Asegúrate de importar MessagesModule
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';

// Importa AuthInterceptor si lo usas
//import { authInterceptorProviders } from './auth-interceptor.interceptor';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule, 
        AppRoutingModule,
        AuthModule,
        AppConfigModule,
        MessagesModule,ToastModule
       // SharedModule,
    ],
    providers: [authInterceptorProviders,MessageService,ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
