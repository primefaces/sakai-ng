import { Component, inject, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CarDataService } from '../../../shared/services/car-data.service';

@Component({
    selector: 'client-form',
    imports: [FormsModule, SelectModule, DatePickerModule, InputTextModule, ButtonModule, FluidModule, AutoCompleteModule],
    templateUrl: './client-form.component.html',
    styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
    carDataService = inject(CarDataService);
    make = '';
    model = '';
    year: any;
    color = '';
    makes = this.carDataService.makes;
    type = [];
    regNo = '';
    ownerName = '';
    contactNumber = '';
    client: ModelSignal<any> = model.required();
    vehicleTypes = this.carDataService.vehicleTypes;
    filteredMakes: string[] = [];
    filteredModels: string[] = [];
    models: string[] = [];

    searchMake(event: any) {
        const query = event.query.toLowerCase();

        this.filteredMakes = this.makes.map((item) => item.make).filter((make) => make.toLowerCase().includes(query));
    }

    onMakeSelected() {
        this.models = [];
        this.client().model = '';
        const selectedMake = this.makes.find((item) => item.make === this.client().make);
        console.log('selectedMake: ', selectedMake);

        if (selectedMake) {
            this.models = selectedMake?.models;
        }
    }

    searchModel(event: any) {
        const query = event.query.toLowerCase();

        this.filteredModels = this.models.filter((model) => model.toLowerCase().includes(query));
    }
}
