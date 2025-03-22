import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-messages-demo',
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule],
    templateUrl: './messages-demo.component.html',
    styleUrl: './messages-demo.component.scss',
    providers: [MessageService]
})
export class MessagesDemoComponent {
    msgs: ToastMessageOptions[] | null = [];

    username: string | undefined;

    email: string | undefined;

    constructor(private service: MessageService) {}

    showInfoViaToast() {
        this.service.add({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    }

    showWarnViaToast() {
        this.service.add({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    }

    showErrorViaToast() {
        this.service.add({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    }

    showSuccessViaToast() {
        this.service.add({ severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    }
}
