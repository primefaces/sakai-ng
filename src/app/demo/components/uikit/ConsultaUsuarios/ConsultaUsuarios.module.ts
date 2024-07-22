import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultaUsuariosDemoComponent } from './ConsultaUsuarios.component';
import { ConsultaUsuariosDemoRoutingModule } from './ConsultaUsuarios-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';

import { MenuModule } from 'primeng/menu';
import { ImageModule } from 'primeng/image';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
	imports: [
		CommonModule,
		ConsultaUsuariosDemoRoutingModule,
		FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule,

        MenuModule,
        ImageModule,
        MenubarModule,
	],
	declarations: [ConsultaUsuariosDemoComponent]
})
export class ConsultaUsuariosDemoModule { }
