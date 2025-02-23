import { Component, Input, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { CapitalizeDirective } from '../../../shared/directives/capitalize.directive';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-supplier-form',
    imports: [InputTextModule, FormsModule, TableModule, FormsModule, ButtonModule, RippleModule, CapitalizeDirective, NgIf],
    templateUrl: './supplier-form.component.html',
    styleUrl: './supplier-form.component.scss'
})
export class SupplierFormComponent {
    @Input() showUtility: boolean = true;

    supplier: ModelSignal<any> = model.required();
}
