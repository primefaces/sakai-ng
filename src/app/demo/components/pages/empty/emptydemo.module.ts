import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { EmptyDemoComponent } from './emptydemo.component';

@NgModule({
    imports: [
        CommonModule,
        EmptyDemoRoutingModule
    ],
    declarations: [EmptyDemoComponent]
})
export class EmptyDemoModule { }
