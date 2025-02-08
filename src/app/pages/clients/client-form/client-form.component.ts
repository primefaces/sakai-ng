import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-client-form',
    imports: [FormsModule, SelectModule, DatePickerModule, InputTextModule, ButtonModule],
    templateUrl: './client-form.component.html',
    styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
    make: any;
    model: any;
    year: any;
    color: any;
    vehicleTypes: any[] | undefined;
    type: any;
    regNo: any;
    ownerName: any;
    contactNumber: any;
}
