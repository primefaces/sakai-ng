import { CommonModule, DatePipe } from '@angular/common';
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
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MurCurrencyPipe } from '../../../shared/pipes/mur-currency.pipe';
import { DeleteConfirmationDialogComponent } from '../../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { HttpService } from '../../../shared/services/http.service';
import { AssetsFormComponent } from '../assets-form/assets-form.component';

@Component({
    selector: 'app-assets-table',
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
        DatePipe,
        AssetsFormComponent
    ],
    templateUrl: './assets-table.component.html',
    styleUrl: './assets-table.component.scss'
})
export class AssetsTableComponent {
    @ViewChild('filter') filter!: ElementRef;
    httpService = inject(HttpService);
    isDialogVisible: any;
    asset: any = {
        date: new Date(),
        asset: '',
        supplier: null,
        amount: 0,
        status: '',
        paidOn: new Date()
    };
    loading: unknown;
    showDeleteConfirmationDialog: any;
    assetExpense = signal<any>([]);
    assetExpenseSignal = computed(() => signal(this.assetExpense()));
    expenseToDeleteId = '';

    ngOnInit(): void {
        this.httpService
            .getExpenses({
                expenseType: 'assets'
            })
            .subscribe((res: any) => {
                this.assetExpense.set(res);
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

    createExpense() {
        const body = { ...this.asset };
        body.supplier = body.supplier?._id;
        body.expenseName = body.asset;
        body.expenseType = 'assets';
        delete body.asset;
        this.httpService.createExpense(body).subscribe((res: any) => {
            res.supplier = this.asset.supplier;
            if (!body._id) {
                this.assetExpenseSignal().update((s: any) => [...s, res].sort((a, b) => a.date - b.date));
            }
            this.hideDialog();
            this.resetAsset();
        });
    }

    onEditExpense(expense: any) {
        this.asset = expense;
        this.asset.date = new Date(expense.date);
        this.asset.paidOn = new Date(expense.paidOn);
        this.asset.asset = expense.expenseName;

        this.showDialog();
    }

    deleteExpense() {
        this.assetExpenseSignal().update((s) => s.filter((s: any) => s._id !== this.expenseToDeleteId));
        this.httpService.deleteExpense(this.expenseToDeleteId).subscribe(() => {});
        this.resetAsset();
    }

    onDeleteClick(expenseId: string) {
        this.showDeleteConfirmationDialog = true;
        this.expenseToDeleteId = expenseId;
    }

    resetAsset() {
        this.asset = {
            date: new Date(),
            asset: '',
            supplier: null,
            amount: 0,
            status: '',
            paidOn: new Date()
        };
    }
}
