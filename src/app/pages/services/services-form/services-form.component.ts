import { Component, inject, model } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { HttpService } from '../../../shared/services/http.service';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-services-form',
    imports: [InputTextModule, FormsModule, InputNumber, TableModule, FormsModule, ButtonModule, RippleModule],
    templateUrl: './services-form.component.html',
    styleUrl: './services-form.component.scss'
})
export class ServicesFormComponent {
    httpService = inject(HttpService);
    name = model();
    price = model();
}
