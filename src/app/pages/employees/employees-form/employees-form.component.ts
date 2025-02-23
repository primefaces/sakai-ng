import { Component, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { CapitalizeDirective } from '../../../shared/directives/capitalize.directive';

@Component({
    selector: 'app-employees-form',
    imports: [InputTextModule, FormsModule, TableModule, FormsModule, ButtonModule, RippleModule, CapitalizeDirective],
    templateUrl: './employees-form.component.html',
    styleUrl: './employees-form.component.scss'
})
export class EmployeesFormComponent {
    employee: ModelSignal<any> = model.required();
}
