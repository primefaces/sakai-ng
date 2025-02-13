import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { ServicesFormComponent } from '../../services/services-form/services-form.component';
import { UtilityFormComponent } from '../utility-form/utility-form.component';

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
        DigitOnlyDirective,
        DeleteConfirmationDialogComponent,
        TabsModule,
        UtilityFormComponent
    ],
    templateUrl: './utilities-table.component.html',
    styleUrl: './utilities-table.component.scss'
})
export class UtilitiesTableComponent {
    utility = {
        date: new Date(),
        provider: '',
        utility: '',
        amount: 0,
        status: '',
        paidOn: new Date()
    };
    showDialog() {
        this.isDialogVisible = true;
    }
    servicesSignal() {
        throw new Error('Method not implemented.');
    }
    loading: unknown;
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
    isDialogVisible: any;
    newServiceName: any;
    newServicePrice: any;
    hideDialog() {
        this.isDialogVisible = false;
    }
    createService() {
        throw new Error('Method not implemented.');
    }
    showDeleteConfirmationDialog: any;
    deleteService() {
        throw new Error('Method not implemented.');
    }
}
