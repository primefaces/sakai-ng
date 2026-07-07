import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

type ConfirmTone = 'danger' | 'warning' | 'primary';

@Component({
    selector: 'app-confirmation-dialog',
    standalone: true,
    imports: [CommonModule, DialogModule, ButtonModule],
    template: `
        <p-dialog
            [(visible)]="visible"
            [modal]="true"
            [closable]="false"
            [dismissableMask]="dismissableMask"
            [draggable]="false"
            [resizable]="false"
            [style]="{ width: width, maxWidth: '94vw' }"
            [contentStyle]="{ padding: '0' }"
            [breakpoints]="{ '960px': '92vw', '640px': '96vw' }"
            [baseZIndex]="1100"
            (onHide)="handleHide()"
        >
            <ng-template #header>
                <div class="flex items-start gap-4 w-full">
                    <div class="flex h-12 w-12 items-center justify-center rounded-full" [ngClass]="toneClasses().badge">
                        <i class="text-xl" [ngClass]="toneClasses().icon"></i>
                    </div>
                    <div class="min-w-0">
                        <div class="text-lg font-semibold text-slate-900">{{ title }}</div>
                        <div class="mt-1 text-sm text-slate-500" *ngIf="subtitle">{{ subtitle }}</div>
                    </div>
                </div>
            </ng-template>

            <div class="space-y-6">
                <p class="m-0 text-sm leading-6 text-slate-600">{{ message }}</p>

                <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <p-button [label]="cancelLabel" severity="secondary" outlined (onClick)="cancelAction()"></p-button>
                    <p-button [label]="confirmLabel" [severity]="toneClasses().buttonSeverity" (onClick)="confirmAction()"></p-button>
                </div>
            </div>
        </p-dialog>
    `,
    styles: [
        `
            :host ::ng-deep .p-dialog {
                border: 1px solid rgba(226, 232, 240, 0.95);
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98));
                color: #0f172a;
                box-shadow: 0 30px 70px rgba(15, 23, 42, 0.16);
                border-radius: 1.5rem;
                overflow: hidden;
            }

            :host ::ng-deep .p-dialog .p-dialog-header {
                background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                border-bottom: 1px solid #e2e8f0;
                padding: 1.25rem 1.35rem 1rem;
            }

            :host ::ng-deep .p-dialog .p-dialog-content {
                background: transparent;
                padding: 1.35rem;
            }

            :host ::ng-deep .p-dialog .p-dialog-header-close {
                color: #64748b;
            }

            :host ::ng-deep .p-dialog .p-dialog-header-close:hover {
                color: #0f172a;
                background: rgba(15, 23, 42, 0.06);
            }
        `
    ]
})
export class ConfirmationDialogComponent {
    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();

    @Input() title = 'Confirm action';
    @Input() subtitle = '';
    @Input() message = 'Are you sure you want to continue?';
    @Input() confirmLabel = 'Confirm';
    @Input() cancelLabel = 'Cancel';
    @Input() tone: ConfirmTone = 'danger';
    @Input() width = '28rem';
    @Input() dismissableMask = true;

    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    toneClasses() {
        switch (this.tone) {
            case 'warning':
                return {
                    badge: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
                    icon: 'pi pi-exclamation-triangle',
                    buttonSeverity: 'warn' as const
                };
            case 'primary':
                return {
                    badge: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
                    icon: 'pi pi-shield',
                    buttonSeverity: 'danger' as const
                };
            default:
                return {
                    badge: 'bg-red-100 text-red-700 ring-1 ring-red-200',
                    icon: 'pi pi-trash',
                    buttonSeverity: 'danger' as const
                };
        }
    }

    confirmAction() {
        this.confirm.emit();
        this.close();
    }

    cancelAction() {
        this.cancel.emit();
        this.close();
    }

    handleHide() {
        if (this.visible) {
            this.close();
        }
    }

    private close() {
        this.visible = false;
        this.visibleChange.emit(false);
    }
}
