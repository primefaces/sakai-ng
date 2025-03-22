import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'footer-widget',
    imports: [RouterModule],
    templateUrl: './footer-widget.component.html',
    styleUrl: './footer-widget.component.scss'
})
export class FooterWidgetComponent {
    constructor(public router: Router) {}
}
