import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { SuppliersComponent } from '../suppliers/suppliers.component';
import { UtilitiesTableComponent } from './utilities-table/utilities-table.component';

@Component({
    selector: 'app-utilities',
    imports: [TabsModule, SuppliersComponent, UtilitiesTableComponent],
    templateUrl: './utilities.component.html',
    styleUrl: './utilities.component.scss'
})
export class UtilitiesComponent {}
