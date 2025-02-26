import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FloatingConfiguratorComponent } from '../../../layout/component/floating-configurator/floating-configurator.component';

@Component({
    selector: 'app-access',
    imports: [ButtonModule, RouterModule, RippleModule, FloatingConfiguratorComponent, ButtonModule],
    templateUrl: './access.component.html',
    styleUrl: './access.component.scss'
})
export class AccessComponent {}
