import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { HttpService } from '../../../shared/services/http.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-sales-form',
    imports: [SelectModule, FormsModule, InputTextModule, TextareaModule, ButtonModule, DatePickerModule],
    templateUrl: './sales-form.component.html',
    styleUrl: './sales-form.component.scss'
})
export class SalesFormComponent {
    httpService = inject(HttpService);

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
    services: any = [];
    servicesSignal = computed(() => signal(this.services()));
    statuses = [
        { name: 'Paid', code: 'paid' },
        { name: 'Due', code: 'due' }
    ];
    selectedStatus = 'Paid  ';

    constructor() {
        this.services = toSignal(this.httpService.getServiceTypes());
        console.log('this.services: ', this.services());
    }

    ngOnInit() {
        setTimeout(() => {
            console.log('this.services: ', this.services());
        }, 5000);
    }
}
