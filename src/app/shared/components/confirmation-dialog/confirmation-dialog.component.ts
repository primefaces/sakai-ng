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
            styleClass="modern-confirm-dialog"
            [modal]="true"
            [closable]="false"
            [dismissableMask]="dismissableMask"
            [draggable]="false"
            [resizable]="false"
            [blockScroll]="true"
            [appendTo]="'body'"
            [style]="{ width: width, maxWidth: '94vw' }"
            [contentStyle]="{ padding: '0' }"
            [breakpoints]="{ '960px': '92vw', '640px': '96vw' }"
            [baseZIndex]="1100"
            (onHide)="handleHide()"
        >
            <ng-template pTemplate="header">
                <div class="flex w-full items-center gap-4">
                    <div
                        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                        [ngClass]="toneClasses().badge"
                    >
                        <i class="text-2xl" [ngClass]="toneClasses().icon"></i>
                    </div>

                    <div class="min-w-0 flex-1">
                        <h2 class="m-0 text-xl font-bold leading-7 text-slate-900">
                            {{ title }}
                        </h2>

                        <p
                            *ngIf="subtitle"
                            class="mt-1 mb-0 text-sm leading-5 text-slate-500"
                        >
                            {{ subtitle }}
                        </p>
                    </div>
                </div>
            </ng-template>

            <div class="px-6 pb-6 pt-2">
                <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p class="m-0 text-sm leading-6 text-slate-600">
                        {{ message }}
                    </p>
                </div>

                <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <p-button
                        [label]="cancelLabel"
                        severity="secondary"
                        outlined
                        styleClass="w-full sm:w-auto min-w-28"
                        (onClick)="cancelAction()"
                    ></p-button>

                    <p-button
                        [label]="confirmLabel"
                        [severity]="toneClasses().buttonSeverity"
                        styleClass="w-full sm:w-auto min-w-28"
                        (onClick)="confirmAction()"
                    ></p-button>
                </div>
            </div>
        </p-dialog>
    `,
    styles: [
        `
            :host ::ng-deep .modern-confirm-dialog.p-dialog {
                border: 1px solid rgba(226, 232, 240, 0.9);
                border-radius: 24px;
                overflow: hidden;
                background: #ffffff;
                box-shadow:
                    0 24px 80px rgba(15, 23, 42, 0.18),
                    0 10px 28px rgba(15, 23, 42, 0.08);
            }

            :host ::ng-deep .modern-confirm-dialog .p-dialog-header {
                padding: 24px 24px 16px;
                border-bottom: none;
                background:
                    radial-gradient(circle at top left, rgba(226, 232, 240, 0.8), transparent 38%),
                    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
            }

            :host ::ng-deep .modern-confirm-dialog .p-dialog-content {
                padding: 0;
                background: #ffffff;
            }

            :host ::ng-deep .modern-confirm-dialog .p-button {
                height: 44px;
                border-radius: 14px;
                font-weight: 600;
                padding-inline: 18px;
            }

            :host ::ng-deep .modern-confirm-dialog .p-button-label {
                font-size: 14px;
            }

            :host ::ng-deep .modern-confirm-dialog .p-button-outlined {
                background: #ffffff;
            }

            :host ::ng-deep .modern-confirm-dialog .p-button-outlined:hover {
                background: #f8fafc;
            }

            :host ::ng-deep .p-dialog-mask {
                background: rgba(15, 23, 42, 0.45);
                backdrop-filter: blur(5px);
            }

            @media (max-width: 640px) {
                :host ::ng-deep .modern-confirm-dialog .p-dialog-header {
                    padding: 20px 20px 14px;
                }

                :host ::ng-deep .modern-confirm-dialog .p-dialog-content > div {
                    padding-left: 20px;
                    padding-right: 20px;
                    padding-bottom: 20px;
                }
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
    @Input() width = '30rem';
    @Input() dismissableMask = true;

    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    toneClasses() {
        switch (this.tone) {
            case 'warning':
                return {
                    badge: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 shadow-sm',
                    icon: 'pi pi-exclamation-triangle',
                    buttonSeverity: 'warn' as const
                };

            case 'primary':
                return {
                    badge: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200 shadow-sm',
                    icon: 'pi pi-info-circle',
                    buttonSeverity: undefined
                };

            default:
                return {
                    badge: 'bg-red-50 text-red-700 ring-1 ring-red-200 shadow-sm',
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