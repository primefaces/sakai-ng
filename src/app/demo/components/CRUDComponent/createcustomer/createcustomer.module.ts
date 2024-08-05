import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerRoutingModule } from './createcustomer-routing.module';
import { CreatecustomerComponent } from './createcustomer.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DropdownModule,
        CreateCustomerRoutingModule,
        AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule
    ],
    declarations: [CreatecustomerComponent]
})
export class CreateCustomerModule { }
