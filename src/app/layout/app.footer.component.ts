import { Component, inject } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
    standalone: true
})
export class AppFooterComponent {

    layoutService = inject(LayoutService);
}
