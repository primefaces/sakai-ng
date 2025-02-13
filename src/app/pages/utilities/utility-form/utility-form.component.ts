import { Component, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-utility-form',
    imports: [DatePickerModule, AutoCompleteModule, SelectModule, FormsModule, InputNumberModule],
    templateUrl: './utility-form.component.html',
    styleUrl: './utility-form.component.scss'
})
export class UtilityFormComponent {
    searchProvider($event: AutoCompleteCompleteEvent) {
        throw new Error('Method not implemented.');
    }
    utility: ModelSignal<any> = model.required();
    filteredProviders!: any[];
    utilityTypes: any[] | undefined;
    statusOptions: any[] | undefined;
}
