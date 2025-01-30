import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FloatingConfiguratorComponent } from '../../../layout/component/floating-configurator/floating-configurator.component';

@Component({
    selector: 'app-error',
    imports: [ButtonModule, RippleModule, RouterModule, FloatingConfiguratorComponent, ButtonModule],
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss'
})
export class ErrorComponent {}
