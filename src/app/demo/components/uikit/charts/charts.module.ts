import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart'
import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ChartsRoutingModule,
        ChartModule
    ],
    declarations: [ChartsComponent]
})
export class ChartsModule { }
