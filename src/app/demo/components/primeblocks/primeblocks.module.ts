import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocksComponent } from './blocks/blocks.component';
import { PrimeBlocksRoutingModule } from './primeblocks-routing.module';
import { BlockViewer } from './blockviewer/blockviewer.component'
import { AppCodeModule } from '../code/code.component';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    imports: [
        CommonModule,
        AppCodeModule,
        ButtonModule,
        RippleModule,
        ChipModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        TooltipModule,
        PrimeBlocksRoutingModule,
        AppCodeModule
    ],
    declarations: [BlocksComponent, BlockViewer]
})
export class PrimeBlocksModule { }
