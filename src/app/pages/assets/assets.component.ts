import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { AssetsTableComponent } from './assets-table/assets-table.component';
import { SuppliersComponent } from '../suppliers/suppliers.component';

@Component({
    selector: 'app-assets',
    imports: [TabsModule, AssetsTableComponent, SuppliersComponent],
    templateUrl: './assets.component.html',
    styleUrl: './assets.component.scss'
})
export class AssetsComponent {}
