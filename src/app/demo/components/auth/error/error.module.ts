import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        ErrorRoutingModule,
        ButtonModule
    ],
    declarations: [ErrorComponent]
})
export class ErrorModule { }
