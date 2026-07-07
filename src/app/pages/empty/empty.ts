import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import type { PaginatorState } from 'primeng/types/paginator';
import { ConfirmationDialogComponent } from '@/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AlertModalComponent, AlertSeverity } from '@/app/shared/components/alert-modal/alert-modal.component';
import { ScrollableModalComponent } from '@/app/shared/components/scrollable-modal/scrollable-modal.component';
import { PaginationComponent } from '@/app/shared/components/pagination/pagination.component';

@Component({
    selector: 'app-empty',
    standalone: true,
    imports: [CommonModule, ButtonModule, ConfirmationDialogComponent, AlertModalComponent, ScrollableModalComponent, PaginationComponent],
    template: `
        <div class="brand-shell p-6 md:p-8">
            <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <div class="brand-chip mb-4">Centralized shared UI</div>
                    <h1 class="text-3xl md:text-4xl font-bold text-white mb-3">Red, black, and white by default</h1>
                    <p class="brand-text-muted max-w-2xl leading-7 m-0">
                        This page shows the reusable pieces that can be dropped into any document-tracking screen: confirmation dialogs, alert modals, scrollable modals, and a standalone paginator.
                    </p>
                </div>

                <div class="flex flex-wrap gap-3">
                    <p-button label="Open confirm" icon="pi pi-trash" severity="danger" (onClick)="openConfirm()"></p-button>
                    <p-button label="Success alert" icon="pi pi-check" severity="success" (onClick)="openAlert('success')"></p-button>
                    <p-button label="Warning alert" icon="pi pi-exclamation-triangle" severity="warn" (onClick)="openAlert('warning')"></p-button>
                    <p-button label="Scrollable modal" icon="pi pi-window-maximize" severity="secondary" outlined (onClick)="showDetails = true"></p-button>
                </div>
            </div>

            <div class="grid gap-4 lg:grid-cols-3 mt-8">
                <div class="brand-card p-5">
                    <div class="text-sm uppercase tracking-[0.22em] text-white/50 mb-2">Theme</div>
                    <div class="text-xl font-semibold text-white mb-2">Central brand tokens</div>
                    <p class="brand-text-muted m-0 leading-7">The preset is centralized in one file, so the whole app stays on the same red-black-white palette.</p>
                </div>
                <div class="brand-card p-5">
                    <div class="text-sm uppercase tracking-[0.22em] text-white/50 mb-2">Dialogs</div>
                    <div class="text-xl font-semibold text-white mb-2">Reusable modals</div>
                    <p class="brand-text-muted m-0 leading-7">Confirmation and alert modals are componentized, so the same behavior can be reused from any page.</p>
                </div>
                <div class="brand-card p-5">
                    <div class="text-sm uppercase tracking-[0.22em] text-white/50 mb-2">Pagination</div>
                    <div class="text-xl font-semibold text-white mb-2">Standalone control</div>
                    <p class="brand-text-muted m-0 leading-7">Use the paginator wherever you need custom paging logic, separate from PrimeNG tables.</p>
                </div>
            </div>

            <div class="brand-card p-5 mt-6">
                <div class="flex items-center justify-between gap-4 mb-4">
                    <div>
                        <div class="text-lg font-semibold text-white">Sample records</div>
                        <div class="brand-text-muted text-sm mt-1">Paged with the shared paginator below.</div>
                    </div>
                    <div class="text-sm text-white/60">
                        {{ pageStart + 1 }}-{{ pageEnd }} of {{ records.length }}
                    </div>
                </div>

                <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <div class="rounded-2xl border border-white/10 bg-black/35 p-4" *ngFor="let record of pagedRecords">
                        <div class="flex items-center justify-between gap-3">
                            <div class="font-semibold text-white">{{ record.title }}</div>
                            <span class="brand-chip">{{ record.status }}</span>
                        </div>
                        <p class="brand-text-muted mt-3 mb-0 leading-6">{{ record.description }}</p>
                    </div>
                </div>

                <div class="mt-6">
                    <app-pagination
                        [first]="first"
                        [rows]="rows"
                        [totalRecords]="records.length"
                        [rowsPerPageOptions]="[3, 6, 9]"
                        (pageChange)="onPageChange($event)"
                    />
                </div>
            </div>
        </div>

        <app-confirmation-dialog
            [(visible)]="showConfirm"
            title="Delete record?"
            subtitle="Reusable confirmation modal"
            message="This demonstrates the shared confirm dialog that can be reused from any page before destructive actions."
            confirmLabel="Delete"
            cancelLabel="Keep it"
            tone="danger"
            (confirm)="confirmedDelete()"
        />

        <app-alert-modal
            [(visible)]="showAlert"
            [severity]="alertSeverity"
            [title]="alertTitle"
            [message]="alertMessage"
            [details]="alertDetails"
        />

        <app-scrollable-modal [(visible)]="showDetails" header="Scrollable modal" subtitle="Any content can live inside this shell">
            <div class="space-y-4">
                <p class="m-0 brand-text-muted leading-7">
                    Use this component whenever a modal may need a lot of content or a long form. It keeps the header fixed while the body scrolls.
                </p>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-4" *ngFor="let block of detailsBlocks">
                    <div class="text-white font-semibold mb-2">{{ block.title }}</div>
                    <div class="brand-text-muted leading-7">{{ block.body }}</div>
                </div>
                <div class="flex justify-end pt-2">
                    <p-button label="Close" severity="secondary" outlined (onClick)="showDetails = false"></p-button>
                </div>
            </div>
        </app-scrollable-modal>
    `
})
export class Empty {
    showConfirm = false;
    showAlert = false;
    showDetails = false;

    alertSeverity: AlertSeverity = 'success';
    alertTitle = 'Success';
    alertMessage = 'The action completed successfully.';
    alertDetails = 'This modal can be opened anywhere you need to show a success, warning, or error state.';

    first = 0;
    rows = 6;

    records = [
        { title: 'Incoming mail', status: 'Pending', description: 'New correspondence is waiting for classification.' },
        { title: 'Board memo', status: 'Approved', description: 'The memo has been reviewed and approved for circulation.' },
        { title: 'Archive request', status: 'Review', description: 'The archive request is waiting on a final check.' },
        { title: 'Signed contract', status: 'Done', description: 'The signed copy has been stored in the records vault.' },
        { title: 'Case file', status: 'Queue', description: 'The case file is queued for routing to the right desk.' },
        { title: 'Policy update', status: 'Published', description: 'The updated policy is now visible to the organization.' },
        { title: 'Expense report', status: 'Pending', description: 'Finance is validating receipts and totals.' },
        { title: 'Access request', status: 'Resolved', description: 'The permission request has been fully resolved.' },
        { title: 'Supplier record', status: 'Draft', description: 'The supplier profile is waiting for an owner review.' }
    ];

    detailsBlocks = [
        {
            title: 'Scrollable content',
            body: 'The modal container keeps the header fixed and lets the body scroll naturally when the content grows.'
        },
        {
            title: 'Any layout you need',
            body: 'You can place forms, long explanations, or a multi-step flow inside the same reusable wrapper.'
        },
        {
            title: 'Shared behavior',
            body: 'Mask dismissal, close behavior, and sizing are handled in one place so every modal stays consistent.'
        }
    ];

    get pagedRecords() {
        return this.records.slice(this.first, this.first + this.rows);
    }

    get pageStart() {
        return this.records.length === 0 ? 0 : this.first;
    }

    get pageEnd() {
        return Math.min(this.first + this.rows, this.records.length);
    }

    openConfirm() {
        this.showConfirm = true;
    }

    confirmedDelete() {
        this.openAlert('error', 'Record deleted', 'The shared confirmation dialog closed after confirming the action.');
    }

    openAlert(severity: AlertSeverity, title?: string, message?: string) {
        this.alertSeverity = severity;
        this.alertTitle = title || this.defaultTitleFor(severity);
        this.alertMessage = message || this.defaultMessageFor(severity);
        this.alertDetails = this.defaultDetailsFor(severity);
        this.showAlert = true;
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? this.rows;
    }

    private defaultTitleFor(severity: AlertSeverity) {
        switch (severity) {
            case 'warning':
                return 'Warning';
            case 'error':
                return 'Error';
            case 'info':
                return 'Information';
            default:
                return 'Success';
        }
    }

    private defaultMessageFor(severity: AlertSeverity) {
        switch (severity) {
            case 'warning':
                return 'Please review the highlighted item before continuing.';
            case 'error':
                return 'Something needs attention before the process can continue.';
            case 'info':
                return 'Here is a quick update for your attention.';
            default:
                return 'The action completed successfully.';
        }
    }

    private defaultDetailsFor(severity: AlertSeverity) {
        switch (severity) {
            case 'warning':
                return 'Use the warning state when a user should pause and review the next step.';
            case 'error':
                return 'Use the error state for failed operations, blocked saves, or validation problems.';
            case 'info':
                return 'Use the info state when you want to share neutral status updates.';
            default:
                return 'Use the success state when an operation finishes normally.';
        }
    }
}
