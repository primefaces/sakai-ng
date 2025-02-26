import { Component, inject, Input, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { HttpService } from '../../../shared/services/http.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-assets-form',
    imports: [DatePickerModule, AutoCompleteModule, SelectModule, FormsModule, InputNumberModule, InputTextModule],
    templateUrl: './assets-form.component.html',
    styleUrl: './assets-form.component.scss'
})
export class AssetsFormComponent {
    http = inject(HttpService);
    filteredProviders!: any[];
    asset: ModelSignal<any> = model.required();
    statusOptions = ['Paid', 'Due'];
    providers: any = [];

    constructor() {
        this.providers = toSignal(this.http.getSuppliers({ expenseType: 'assets' }));
    }

    searchProvider($event: AutoCompleteCompleteEvent) {
        const query = $event.query.toLowerCase();
        this.filteredProviders = this.providers().filter((provider: any) => provider.name.toLowerCase().includes(query));
    }
}
