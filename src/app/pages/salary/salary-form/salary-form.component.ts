import { Component, inject, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { HttpService } from '../../../shared/services/http.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-salary-form',
    imports: [DatePickerModule, AutoCompleteModule, SelectModule, FormsModule, InputNumberModule, InputTextModule],
    templateUrl: './salary-form.component.html',
    styleUrl: './salary-form.component.scss'
})
export class SalaryFormComponent {
    salary: ModelSignal<any> = model.required();
    filteredEmployees!: any[];
    employees: any = [];

    statusOptions = ['Paid', 'Due'];
    httpService = inject(HttpService);

    constructor() {
        this.employees = toSignal(this.httpService.getEmployees());
    }

    ngOnInit(): void {}
    searchEmployee(event: AutoCompleteCompleteEvent) {
        const query = event.query.toLowerCase();
        this.filteredEmployees = this.employees().filter((employee: any) => employee.name.toLowerCase().includes(query));
    }
}
