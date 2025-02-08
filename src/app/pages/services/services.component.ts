import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
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
import { CustomerService } from '../service/customer.service';
import { ProductService } from '../service/product.service';
import { DialogModule } from 'primeng/dialog';
import { ServicesFormComponent } from './services-form/services-form.component';
import { HttpService } from '../../shared/services/http.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MurCurrencyPipe } from '../../shared/pipes/mur-currency.pipe';
import { DigitOnlyDirective } from '../../shared/directives/digit-only.directive';

@Component({
    selector: 'app-services',
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
        ServicesFormComponent,
        MurCurrencyPipe,
        DigitOnlyDirective
    ],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss',
    providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class ServicesComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    customerService = inject(CustomerService);
    httpService = inject(HttpService);
    newServiceName = '';
    newServicePrice = 0;

    customers: any = [];
    loading = false;
    activityValues: number[] = [0, 100];
    services: any = [];
    servicesSignal = computed(() => signal(this.services()));

    statuses = [
        { label: 'Unqualified', value: 'unqualified' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'New', value: 'new' },
        { label: 'Negotiation', value: 'negotiation' },
        { label: 'Renewal', value: 'renewal' },
        { label: 'Proposal', value: 'proposal' }
    ];
    representatives = [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ];

    isDialogVisible = false;
    constructor() {
        this.services = toSignal(this.httpService.getServiceTypes());
    }

    ngOnInit(): void {}

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getSeverity(status: string) {
        switch (status) {
            case 'qualified':
            case 'instock':
            case 'INSTOCK':
            case 'DELIVERED':
            case 'delivered':
                return 'success';

            case 'negotiation':
            case 'lowstock':
            case 'LOWSTOCK':
            case 'PENDING':
            case 'pending':
                return 'warn';

            case 'unqualified':
            case 'outofstock':
            case 'OUTOFSTOCK':
            case 'CANCELLED':
            case 'cancelled':
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

    createService() {
        this.httpService.createServiceType({ name: this.newServiceName, price: this.newServicePrice }).subscribe((data: any) => {
            this.servicesSignal().update((s: any) => [...s, data].sort((a: any, b: any) => a.name - b.name));
        });
        this.isDialogVisible = false;
    }

    updateService(service: any, field: any, event: any) {
        const newValue = event.target.innerText.trim();

        const processedValue = field === 'price' ? parseFloat(newValue.replace(/[^\d.-]/g, '')) : newValue;

        if (service[field] === processedValue) {
            return;
        }

        service[field] = processedValue;

        this.httpService.updateServiceType(service).subscribe((data: any) => {
            console.log('Service updated successfully');
        });
    }

    deleteService(serviceId: string) {
        this.httpService.deleteServiceType(serviceId).subscribe((data: any) => {
            this.servicesSignal().update((s: any) => s.filter((service: any) => service._id !== serviceId));
        });
    }
}
