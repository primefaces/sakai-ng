import { Component, computed, inject, model, ModelSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { HttpService } from '../../../shared/services/http.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
    selector: 'app-sales-form',
    imports: [SelectModule, FormsModule, InputTextModule, TextareaModule, ButtonModule, DatePickerModule, AutoCompleteModule],
    templateUrl: './sales-form.component.html',
    styleUrl: './sales-form.component.scss'
})
export class SalesFormComponent {
    filteredClients: any = [];

    httpService = inject(HttpService);
    sale: ModelSignal<any> = model.required();

    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    dropdownItem = null;
    value3 = '';
    date = new Date();
    timeStart = '';
    timeEnd = '';
    services: any = [];
    servicesSignal = computed(() => signal(this.services()));
    clients: any = [];
    clientsSignal = computed(() => signal(this.clients()));
    statuses = ['Paid', 'Due'];

    paymentMethods = ['Cash', 'Card', 'Mobile', 'Cheque'];

    constructor() {
        this.services = toSignal(this.httpService.getServiceTypes());
        this.clients = toSignal(this.httpService.getClients());
    }

    ngOnInit() {}

    searchClient($event: any) {
        const query = $event.query.toLowerCase();

        this.filteredClients = this.clients()
            .map((client: any) => client.regNo + ' - ' + client.make + ' ' + client.model + ' ' + client.color)
            .filter((client: any) => client?.toLowerCase().includes(query));
    }

    onClientSelected() {
        throw new Error('Method not implemented.');
    }

    getFormattedTime(timeType: string) {
        if (this.sale()[timeType]) {
            const hours = this.sale()[timeType].getHours().toString().padStart(2, '0');
            const minutes = this.sale()[timeType].getMinutes().toString().padStart(2, '0');
            const time = hours + ':' + minutes;
            this.sale()[timeType] = time;
        }
    }
    onVehicleSelect() {
        const regNo = this.sale().vehicleName.split(' - ')[0];

        const vehicleSelected = this.clients().find((client: any) => client.regNo === regNo);

        this.sale().vehicle = vehicleSelected._id;
    }

    onServiceTypeSelect() {
        const serviceTypeSelected = this.sale().serviceTypeName;

        this.sale().serviceType = serviceTypeSelected._id;
    }
}
