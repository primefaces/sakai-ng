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
import { DigitOnlyDirective } from '../../../shared/directives/digit-only.directive';
import { MurCurrencyPipe } from '../../../shared/pipes/mur-currency.pipe';
import { DeleteConfirmationDialogComponent } from '../../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UtilityFormComponent } from '../utility-form/utility-form.component';
import { HttpService } from '../../../shared/services/http.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-utilities-table',
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
        DatePipe
    ],
    templateUrl: './utilities-table.component.html',
    styleUrl: './utilities-table.component.scss'
})
export class UtilitiesTableComponent {
    http = inject(HttpService);
    utility: any = {
        date: new Date(),
        provider: null,
        utility: '',
        amount: 0,
        status: '',
        paidOn: new Date()
    };

    loading: unknown;
    isDialogVisible: any;
    newServiceName: any;
    newServicePrice: any;
    showDeleteConfirmationDialog: any;
    utilityExpenses: any = [];
    utilityExpensesSignal = computed(() => signal(this.utilityExpenses()));
    constructor() {
        this.utilityExpenses = toSignal(this.http.getExpenses({}));
    }

    showDialog() {
        this.isDialogVisible = true;
    }

    servicesSignal() {
        throw new Error('Method not implemented.');
    }

    clear(_t15: Table) {
        throw new Error('Method not implemented.');
    }

    onGlobalFilter(_t15: Table, $event: Event) {
        throw new Error('Method not implemented.');
    }

    updateService(_t34: any, arg1: string, $event: FocusEvent) {
        throw new Error('Method not implemented.');
    }

    onDeleteServiceCLick(arg0: any) {
        throw new Error('Method not implemented.');
    }

    hideDialog() {
        this.isDialogVisible = false;
    }

    createExpense() {
        const body = { ...this.utility };
        body.supplier = body.provider?._id;
        body.expenseName = body.utility;
        body.expenseType = 'utility';
        delete body.utility;
        delete body.provider;
        console.log({ body });
        this.http.createExpense(body).subscribe((res) => {});
    }

    deleteService() {
        throw new Error('Method not implemented.');
    }
}
