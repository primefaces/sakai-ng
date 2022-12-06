import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons/icons.component';
import { UtilitiesRoutingModule } from './utilities-routing.module';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        UtilitiesRoutingModule,
        InputTextModule
    ],
    declarations: [IconsComponent]
})
export class UtilitiesModule { }
