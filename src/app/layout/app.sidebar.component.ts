import { Component, ElementRef, inject } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { AppMenuComponent } from './app.menu.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
    standalone: true,
    imports: [AppMenuComponent]
})
export class AppSidebarComponent {

    layoutService = inject(LayoutService);
    
    el = inject(ElementRef);
}

