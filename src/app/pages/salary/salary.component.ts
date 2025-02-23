import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { SalaryTableComponent } from './salary-table/salary-table.component';
import { MurCurrencyPipe } from '../../shared/pipes/mur-currency.pipe';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-salary',
    imports: [TabsModule, SalaryTableComponent],
    templateUrl: './salary.component.html',
    styleUrl: './salary.component.scss'
})
export class SalaryComponent {}
