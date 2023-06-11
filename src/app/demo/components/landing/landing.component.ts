import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    standalone: true,
    imports: [StyleClassModule, ButtonModule, DividerModule]
})
export class LandingComponent {

    constructor(public layoutService: LayoutService, public router: Router) { }
    
}
