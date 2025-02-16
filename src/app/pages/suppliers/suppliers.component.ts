import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, inject, model, ModelSignal, signal, ViewChild } from '@angular/core';
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
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { HttpService } from '../../shared/services/http.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-suppliers',
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
        SupplierFormComponent,
        DigitOnlyDirective,
        DeleteConfirmationDialogComponent
    ],
    templateUrl: './suppliers.component.html',
    styleUrl: './suppliers.component.scss'
})
export class SuppliersComponent {
    @ViewChild('filter') filter!: ElementRef;

    httpService = inject(HttpService);
    expenseType: ModelSignal<string> = model.required();
    supplier = {
        name: '',
        expenseName: '',
        expenseType: '',
        tel: ''
    };
    isDialogVisible: any;
    newServiceName: any;
    newServicePrice: any;
    showDeleteConfirmationDialog: any;
    supplierToDeleteId = '';
    suppliers: any = [];
    suppliersSignal = computed(() => signal(this.suppliers()));
    loading: unknown;

    constructor() {
        this.suppliers = toSignal(this.httpService.getSuppliers());
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
    updateSupplier(supplier: any, field: string, event: any) {
        const newValue = event.target.innerText.trim();
        if (supplier[field] === newValue) {
            return;
        }
        supplier[field] = newValue;

        this.httpService.updateSupplier(supplier).subscribe();
    }

    onDeleteSupplierCLick(id: string) {
        this.supplierToDeleteId = id;
        this.showDeleteConfirmationDialog = true;
    }
    hideDialog() {
        this.isDialogVisible = false;
    }

    createSupplier() {
        this.supplier.expenseType = this.expenseType();
        this.httpService.createSupplier(this.supplier).subscribe(() => {
            this.suppliersSignal().update((s: any) => [...s, this.supplier]);
            this.isDialogVisible = false;
            this.resetSupplier();
        });
    }

    resetSupplier() {
        this.supplier = {
            name: '',
            expenseName: '',
            expenseType: this.expenseType(),
            tel: ''
        };
    }

    deleteService() {
        this.httpService.deleteSupplier(this.supplierToDeleteId).subscribe(() => {
            this.suppliersSignal().update((s: any) => s.filter((supplier: any) => supplier.id !== this.supplierToDeleteId));
            this.resetSupplier();
        });
    }
}
