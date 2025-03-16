import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DigitOnlyDirective } from '../../shared/directives/digit-only.directive';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpService } from '../../shared/services/http.service';
import { EmployeesFormComponent } from './employees-form/employees-form.component';

@Component({
    selector: 'app-employees',
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule,
        DialogModule,
        DigitOnlyDirective,
        DeleteConfirmationDialogComponent,
        EmployeesFormComponent
    ],
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
    @ViewChild('filter') filter!: ElementRef;
    httpService = inject(HttpService);
    showDeleteConfirmationDialog = false;
    employeeToDeleteId = '';
    employees = signal<any>([]);
    employeesSignal = computed(() => signal(this.employees()));
    isDialogVisible = false;
    loading: unknown;
    employee = {
        name: '',
        address: '',
        email: '',
        tel: ''
    };

    ngOnInit(): void {
        this.httpService.getEmployees().subscribe((res: any) => {
            this.employees.set(res);
        });
    }

    showDialog() {
        this.isDialogVisible = true;
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
        this.isDialogVisible = false;
    }

    createEmployee() {
        this.isDialogVisible = false;
        console.log('this.employee: ', this.employee);
        this.httpService.createEmployee(this.employee).subscribe((response: any) => {
            this.employeesSignal().update((s: any) => [...s, response].sort((a, b) => a.name - b.name));
            this.hideDialog();
        });
    }

    deleteEmployee() {
        this.employeesSignal().update((s) => s.filter((s: any) => s._id !== this.employeeToDeleteId));
        this.httpService.deleteEmployee(this.employeeToDeleteId).subscribe(() => {});
    }

    onDeleteEmployeeCLick(id: string) {
        this.employeeToDeleteId = id;
        this.showDeleteConfirmationDialog = true;
    }

    updateEmployee(employees: any, field: string, event: any) {
        
        const newValue = event.target.innerText.trim();

        if(employees[field] === newValue) {
            return;
        }

        employees[field] = newValue;
        this.httpService.updateEmployee(employees).subscribe((data: any) => {
            console.log('Employee updated successfully');
        });
    }
}
