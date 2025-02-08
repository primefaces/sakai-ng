import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'client-form',
    imports: [FormsModule, SelectModule, DatePickerModule, InputTextModule, ButtonModule, FluidModule],
    templateUrl: './client-form.component.html',
    styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
    make = '';
    model = '';
    year: any;
    color = '';
    vehicleTypes = [
        { label: 'Small Car', value: 'Small Car' },
        { label: 'Sedan', value: 'Sedan' },
        { label: 'SUV', value: 'SUV' },
        { label: 'Pickup', value: 'PickUp' },
        { label: 'Coupe', value: 'Coupe' },
        { label: 'Motorcycle', value: 'Motorcycle' },
        { label: 'Van', value: 'Van' },
        { label: 'Truck', value: 'Truck' },
        { label: 'Other', value: 'Other' }
    ];
    type = [];
    regNo = '';
    ownerName = '';
    contactNumber = '';
}
