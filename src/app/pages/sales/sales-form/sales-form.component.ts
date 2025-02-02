import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'app-sales-form',
    imports: [SelectModule, FormsModule, InputTextModule, TextareaModule, ButtonModule, DatePickerModule],
    templateUrl: './sales-form.component.html',
    styleUrl: './sales-form.component.scss'
})
export class SalesFormComponent {
    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    dropdownItem = null;
    value3 = 'some text';
    date = new Date();
    timeStart = '13:00';
    timeEnd = '17:00';
    selectedService = 'Full wash';
    services = [
        { label: 'Full wash', value: 'Full wash', price: 100 },
        {
            label: 'Interior wash',
            value: 'Interior wash',
            price: 50
        },
        { label: 'Exterior wash', value: 'Exterior wash', price: 50 },
        { label: 'Engine wash', value: 'Engine wash', price: 50 }
    ];

    statuses = [
        { name: 'Paid', code: 'paid' },
        { name: 'Due', code: 'due' }
    ];
    selectedStatus = 'Paid  ';
}
