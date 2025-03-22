import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-best-selling-widget',
    imports: [CommonModule, ButtonModule, MenuModule],
    templateUrl: './bestselling-widget.component.html',
    styleUrl: './bestselling-widget.component.scss'
})
export class BestsellingWidgetComponent {
    menu = null;

    items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
    ];
}
