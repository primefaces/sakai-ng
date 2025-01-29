import { Component, ElementRef } from '@angular/core';
import { AppMenu } from '../app.menu';

@Component({
    selector: 'app-sidebar',
    imports: [AppMenu],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    constructor(public el: ElementRef) {}
}
