import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { AppCodeModule } from '../code/code.component';
import { DocumentationComponent } from './documentation.component';

@NgModule({
    imports: [
        CommonModule,
        AppCodeModule,
        DocumentationRoutingModule
    ],
    declarations: [DocumentationComponent]
})
export class DocumentationModule { }
