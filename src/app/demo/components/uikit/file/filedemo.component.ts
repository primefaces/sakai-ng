import { Component } from '@angular/core';
import { MessageService, SharedModule } from 'primeng/api';
import { NgIf, NgFor } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
    templateUrl: './filedemo.component.html',
    providers: [MessageService],
    standalone: true,
    imports: [FileUploadModule, SharedModule, NgIf, NgFor]
})
export class FileDemoComponent {

    uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) {}

    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

}
