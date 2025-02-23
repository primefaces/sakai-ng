import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
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
import { UtilityFormComponent } from '../../utilities/utility-form/utility-form.component';
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
        UtilityFormComponent,
        DatePipe,
        AssetsFormComponent
    ],
    templateUrl: './assets-table.component.html',
    styleUrl: './assets-table.component.scss'
})
export class AssetsTableComponent {
    httpService = inject(HttpService);
    isDialogVisible: any;
    asset: any = {
        date: new Date(),
        provider: null,
        amount: 0,
        status: '',
        paidOn: new Date()
    };
    loading: unknown;
    showDeleteConfirmationDialog: any;
    assetExpense = signal([]);
    assetExpenseSignal = computed(() => signal(this.assetExpense()));

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

    clear(_t14: Table) {
        throw new Error('Method not implemented.');
    }
    onGlobalFilter(_t14: Table, $event: Event) {
        throw new Error('Method not implemented.');
    }
    onEditExpense(_t41: any) {
        throw new Error('Method not implemented.');
    }
    onDeleteClick(arg0: any) {
        throw new Error('Method not implemented.');
    }

    hideDialog() {
        this.isDialogVisible = false;
    }

    createExpense() {
        throw new Error('Method not implemented.');
    }
    deleteExpense() {
        throw new Error('Method not implemented.');
    }
}
