import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Component({
    templateUrl: './messages.component.html',
    styles: [`
		:host ::ng-deep .p-message {
			margin-left: .25em;
		}

        :host ::ng-deep .p-toast{
            margin-top: 5.70em;
            z-index:99999;
        }
    `],
    providers: [MessageService]
})
export class MessagesComponent {

    msgs: Message[] = [];

    constructor(private service: MessageService) {}

    showInfoViaToast() {
        this.service.add({key: 'tst', severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
    }

    showWarnViaToast() {
        this.service.add({key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'});
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
