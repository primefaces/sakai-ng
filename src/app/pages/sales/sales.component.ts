import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CustomerService } from '../service/customer.service';
import { CommonModule } from '@angular/common';
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
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../service/product.service';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { HttpService } from '../../shared/services/http.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'app-sales',
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
        SalesFormComponent,
        DeleteConfirmationDialogComponent,
        DatePicker
    ],
    templateUrl: './sales.component.html',
    styleUrl: './sales.component.scss',
    providers: [ConfirmationService, MessageService, CustomerService, ProductService, DeleteConfirmationDialogComponent]
})
export class SalesComponent {
    @ViewChild('filter') filter!: ElementRef;
    httpService = inject(HttpService);
    sales: any = [];
    salesSignal = computed(() => signal(this.sales()));
    loading = false;
    rangeDates: Date[] = [];
    isDialogVisible = false;
    sale = {
        date: new Date(),
        vehicleName: '',
        vehicleId: '',
        timeStart: '',
        timeEnd: '',
        serviceTypeName: '',
        serviceType: null,
        price: '',
        status: '',
        paymentMethod: '',
        comments: ''
    };
    showDeleteConfirmationDialog = false;
    serviceToDeleteId = '';
    constructor() {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        this.rangeDates = [firstDay, lastDay];
        this.sales = toSignal(this.httpService.getSales(this.rangeDates));
    }

    ngOnInit(): void {}

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onDateChange(event: any) {
        console.log(this.rangeDates);
        const [start, end] = this.rangeDates;
        if (start && end) {
            this.getSales();
        }
    }

    getSales() {
        this.sales = this.httpService.getSales(this.rangeDates).subscribe((sales: any) => {
            this.salesSignal().set(sales);
        });
    }

    getSeverity(status: string) {
        switch (status) {
            case 'Paid':
                return 'success';

            case 'Due':
                return 'danger';

            default:
                return 'info';
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    showDialog() {
        this.isDialogVisible = true;
    }
    hideDialog() {
        this.resetSale();
        this.isDialogVisible = false;
    }

    resetSale() {
        this.sale = {
            date: new Date(),
            vehicleName: '',
            vehicleId: '',
            timeStart: '',
            timeEnd: '',
            serviceTypeName: '',
            serviceType: null,
            price: '',
            status: '',
            paymentMethod: '',
            comments: ''
        };
        this.serviceToDeleteId = '';
    }

    createSale() {
        this.httpService.createSale(this.sale).subscribe((response: any) => {
            this.httpService.getSales(this.rangeDates).subscribe((sales: any) => {
                this.sales = sales;
                this.salesSignal().set(sales);
            });
            this.hideDialog();
        });
    }

    onEditSaleClick(sale: any) {
        this.sale = sale;
        this.sale.date = new Date(sale.date);
        this.sale.vehicleName = sale.vehicle.regNo + ' - ' + sale.vehicle.make + ' ' + sale.vehicle.model + ' ' + sale.vehicle.color;
        this.sale.vehicleId = sale.vehicle._id;
        this.sale.serviceTypeName = sale.serviceType;
        this.showDialog();
    }

    deleteSale() {
        this.salesSignal().update((s) => s.filter((s: any) => s._id !== this.serviceToDeleteId));
        this.httpService.deleteSale(this.serviceToDeleteId).subscribe((response: any) => {});
    }

    onDeleteClick(saleId: string) {
        this.showDeleteConfirmationDialog = true;
        this.serviceToDeleteId = saleId;
    }
}
