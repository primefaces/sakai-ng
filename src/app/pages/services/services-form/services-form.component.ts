import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-services-form',
    imports: [InputTextModule],
    templateUrl: './services-form.component.html',
    styleUrl: './services-form.component.scss'
})
export class ServicesFormComponent {}
