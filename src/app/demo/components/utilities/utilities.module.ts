import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons/icons.component';
import { UtilitiesRoutingModule } from './utilities-routing.module';
import { AppCodeModule } from '../code/code.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        UtilitiesRoutingModule,
        AppCodeModule,
        InputTextModule,
    ],
    declarations: [IconsComponent]
})
export class UtilitiesModule { }
