import { Component, inject, model, ModelSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { HttpService } from '../../../shared/services/http.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-utility-form',
    imports: [DatePickerModule, AutoCompleteModule, SelectModule, FormsModule, InputNumberModule, InputTextModule],
    templateUrl: './utility-form.component.html',
    styleUrl: './utility-form.component.scss'
})
export class UtilityFormComponent {
    utility: ModelSignal<any> = model.required();
    filteredProviders!: any[];
    utilityTypes: any = [];
    providers: any = [];

    statusOptions = ['Paid', 'Due'];
    http = inject(HttpService);

    constructor() {
        this.providers = toSignal(this.http.getSuppliers({ expenseType: 'utility' }));
    }

    searchProvider($event: AutoCompleteCompleteEvent) {
        const query = $event.query.toLowerCase();
        this.filteredProviders = this.providers().filter((provider: any) => provider.name.toLowerCase().includes(query));
    }

    onProviderSelect(event: any) {
        const expenseName = event.value.expenseName;
        this.utility().utility = expenseName;
    }

    onProviderBlur() {
        if (!this.utility().provider) {
            this.utility().utility = '';
        }
    }
}
