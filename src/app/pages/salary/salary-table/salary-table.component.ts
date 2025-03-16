import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MurCurrencyPipe } from '../../../shared/pipes/mur-currency.pipe';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DeleteConfirmationDialogComponent } from '../../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SalaryFormComponent } from '../salary-form/salary-form.component';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpService } from '../../../shared/services/http.service';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { UtilityFormComponent } from '../../utilities/utility-form/utility-form.component';

@Component({
    selector: 'app-salary-table',
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
        MurCurrencyPipe,
        DeleteConfirmationDialogComponent,
        TabsModule,
        SalaryFormComponent,
        DatePipe
    ],
    templateUrl: './salary-table.component.html',
    styleUrl: './salary-table.component.scss'
})
export class SalaryTableComponent {
    @ViewChild('filter') filter!: ElementRef;
    httpService = inject(HttpService);
    isDialogVisible = false;
    showDeleteConfirmationDialog = false;
    salaryExpense: any = [];
    salaryExpenseSignal = computed(() => signal(this.salaryExpense()));
    salaryToDeleteId = '';
    salary = {
        date: new Date(),
        employee: null as any,
        amount: 0,
        status: '',
        paidOn: new Date()
    };
    loading: any;

    constructor() {
        this.salaryExpense = toSignal(this.httpService.getExpenses({ expenseType: 'salary' }));
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

    onEditSalaryClick(salary: any) {
        throw new Error('Method not implemented.');
    }

    onDeleteClick(id: string) {
        this.salaryToDeleteId = id;
        this.showDeleteConfirmationDialog = true;
    }

    hideDialog() {
        this.isDialogVisible = false;
    }

    createSalary() {
        this.isDialogVisible = false;
        const body: any = { ...this.salary };
        body.employee = this.salary.employee._id;
        body.expenseType = 'salary';

        this.httpService.createExpense(body).subscribe((response: any) => {
            this.salaryExpenseSignal().update((s: any) => [...s, response].sort((a, b) => a.date - b.date));
            this.hideDialog();
        });
    }

    deleteSalary() {
        this.salaryExpenseSignal().update((s) => s.filter((s: any) => s._id !== this.salaryToDeleteId));
        this.httpService.deleteExpense(this.salaryToDeleteId).subscribe(() => {});
    }
}
