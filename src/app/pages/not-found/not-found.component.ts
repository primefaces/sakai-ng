import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatingConfiguratorComponent } from '../../layout/component/floating-configurator/floating-configurator.component';

@Component({
    selector: 'app-not-found',
    imports: [RouterModule, FloatingConfiguratorComponent, ButtonModule],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {}
