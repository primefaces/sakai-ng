import { Component, computed, inject, signal } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DigitOnlyDirective } from '../../shared/directives/digit-only.directive';
import { MurCurrencyPipe } from '../../shared/pipes/mur-currency.pipe';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpService } from '../../shared/services/http.service';
import { ClientFormComponent } from './client-form/client-form.component';

@Component({
    selector: 'app-clients',
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule,
        DialogModule,
        ClientFormComponent,
        DigitOnlyDirective,
        DeleteConfirmationDialogComponent
    ],
    templateUrl: './clients.component.html',
    styleUrl: './clients.component.scss'
})
export class ClientsComponent {
    httpService = inject(HttpService);
    clients: any = [];
    clientsSignal = computed(() => signal(this.clients()));
    loading: unknown;

    name: any;
    make: any;
    model: any;
    year: any;
    color: any;
    vehicleTypes: any[] | undefined;
    type: any;
    regNo: any;
    ownerName: any;

    contactNumber: any;

    isCreateClientDialogVisible = false;

    client = {
        make: '',
        model: '',
        year: '',
        color: '',
        type: '',
        regNo: '',
        ownerName: '',
        contactNumber: ''
    };
    showDeleteConfirmationDialog = false;
    clientToDeleteId = '';

    constructor() {
        this.clients = toSignal(this.httpService.getClients());
    }

    showNewClientDialog() {
        this.isCreateClientDialogVisible = true;
    }
    hideCreateClientDialog() {
        this.isCreateClientDialogVisible = false;
    }

    createClient() {
        this.isCreateClientDialogVisible = false;
        this.client.year = String(new Date(this.client.year).getFullYear());
        this.clientsSignal().update((c) => [...c, this.client]);
        this.httpService.createClient(this.client).subscribe((response) => {
            this.resetClient();
            console.log(response);
        });
        console.log(this.client);
    }

    resetClient() {
        this.client = {
            make: '',
            model: '',
            year: '',
            color: '',
            type: '',
            regNo: '',
            ownerName: '',
            contactNumber: ''
        };
    }

    onDeleteClientCLick(clientId: string) {
        this.showDeleteConfirmationDialog = true;
        this.clientToDeleteId = clientId;
    }
    deleteClient() {
        this.clientsSignal().update((c) => c.filter((c: any) => c._id !== this.clientToDeleteId));
        this.httpService.deleteClient(this.clientToDeleteId).subscribe((response) => {});
    }
    updateClient(client: any, field: string, event: any) {
        const newValue = event.target.innerText.trim();

        const processedValue = field === 'price' ? parseFloat(newValue.replace(/[^\d.-]/g, '')) : newValue;

        if (client[field] === processedValue) {
            return;
        }

        client[field] = processedValue;
        this.httpService.updateClient(client).subscribe((data: any) => {
            console.log('Client updated successfully');
        });
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    clear(_t15: Table) {
        throw new Error('Method not implemented.');
    }
}
