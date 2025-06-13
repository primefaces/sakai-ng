import {NgModule} from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {LocalStorageService} from "ngx-webstorage";
import {AuthInterceptor} from "./demo/Interceptor/auth-interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, ToastModule, RouterModule.forRoot([])],
    providers: [
        MessageService, LocalStorageService,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
