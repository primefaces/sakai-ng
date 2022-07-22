import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeDemoComponent } from './treedemo.component';
import { TreeDemoRoutingModule } from './treedemo-routing.module';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
    imports: [
        CommonModule,
        TreeDemoRoutingModule,
        FormsModule,
        TreeModule,
        TreeTableModule
    ],
    declarations: [TreeDemoComponent],
})
export class TreeDemoModule { }
