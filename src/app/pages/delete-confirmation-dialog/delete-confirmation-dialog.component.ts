import { Component, model, ModelSignal, output, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'delete-confirmation-dialog',
    imports: [DialogModule, ButtonModule],
    templateUrl: './delete-confirmation-dialog.component.html',
    styleUrl: './delete-confirmation-dialog.component.scss'
})
export class DeleteConfirmationDialogComponent {
    showDialog: ModelSignal<boolean> = model.required();
    onDeleteConfirmation = output();

    closeDialog() {
        this.showDialog.set(false);
    }

    confirmDelete() {
        this.showDialog.set(false);
        this.onDeleteConfirmation.emit();
    }
}
