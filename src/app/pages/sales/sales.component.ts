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
        SalesFormComponent
    ],
    templateUrl: './sales.component.html',
    styleUrl: './sales.component.scss',
    providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class SalesComponent {
    @ViewChild('filter') filter!: ElementRef;
    httpService = inject(HttpService);
    sales: any = [];
    salesSignal = computed(() => signal(this.sales()));
    loading = false;

    isDialogVisible = false;
    sale = {
        date: new Date(),
        vehicleName: '',
        vehicleId: '',
        timeStart: '',
        timeEnd: '',
        serviceType: null,
        price: '',
        status: '',
        paymentMethod: '',
        comments: ''
    };

    constructor() {
        this.sales = toSignal(this.httpService.getSales());
    }
    ngOnInit(): void { }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getSales() { }

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
        this.isDialogVisible = false;
    }

    createSale() {
        const serviceTypeSelected: any = this.sale.serviceType;
        this.sale.serviceType = serviceTypeSelected._id;
        this.httpService.createSale(this.sale).subscribe((response: any) => {
            this.httpService.getSales().subscribe((sales: any) => {
                this.sales = sales;
                this.salesSignal().set(sales);
            });
            this.hideDialog();
        })
}
}