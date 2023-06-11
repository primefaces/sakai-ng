import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
    templateUrl: './messagesdemo.component.html',
    providers: [MessageService],
    standalone: true,
    imports: [ToastModule, ButtonModule, MessagesModule, InputTextModule, MessageModule]
})
export class MessagesDemoComponent {

    msgs: Message[] = [];

    constructor(private service: MessageService) { }

    showInfoViaToast() {
        this.service.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    }

    showWarnViaToast() {
        this.service.add({ key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    }

    showErrorViaToast() {
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    }

    showSuccessViaToast() {
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    }

    showInfoViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    }

    showWarnViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    }

    showErrorViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    }

    showSuccessViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    }
    
}
