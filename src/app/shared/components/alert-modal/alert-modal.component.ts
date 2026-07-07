import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

export type AlertSeverity = 'success' | 'warning' | 'error' | 'info';

@Component({
    selector: 'app-alert-modal',
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
            [baseZIndex]="1110"
            (onHide)="handleHide()"
        >
            <ng-template #header>
                <div class="flex items-start gap-4 w-full">
                    <div class="flex h-12 w-12 items-center justify-center rounded-full" [ngClass]="severityClasses().badge">
                        <i class="text-xl" [ngClass]="severityClasses().icon"></i>
                    </div>
                    <div class="min-w-0">
                        <div class="text-lg font-semibold text-slate-900">{{ title }}</div>
                        <div class="mt-1 text-sm text-slate-500" *ngIf="subtitle">{{ subtitle }}</div>
                    </div>
                </div>
            </ng-template>

            <div class="space-y-6">
                <p class="m-0 text-sm leading-6 text-slate-600">{{ message }}</p>
                <p class="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600" *ngIf="details">
                    {{ details }}
                </p>

                <div class="mt-6 flex justify-end">
                    <p-button [label]="actionLabel" [severity]="severityClasses().buttonSeverity" (onClick)="close()"></p-button>
                </div>
            </div>
        </p-dialog>
    `,
    styles: [
        `
            :host ::ng-deep .p-dialog {
                border: 1px solid rgba(255, 255, 255, 0.08);
                background: linear-gradient(180deg, rgba(28, 28, 28, 0.98), rgba(8, 8, 8, 0.98));
                color: #ffffff;
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
            }

            :host ::ng-deep .p-dialog .p-dialog-header {
                background: transparent;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding: 1.25rem 1.25rem 1rem;
            }

            :host ::ng-deep .p-dialog .p-dialog-content {
                background: transparent;
                padding: 1.25rem;
            }
        `
    ]
})
export class AlertModalComponent {
    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();

    @Input() severity: AlertSeverity = 'success';
    @Input() title = 'Notice';
    @Input() subtitle = '';
    @Input() message = '';
    @Input() details = '';
    @Input() actionLabel = 'Close';
    @Input() width = '28rem';
    @Input() dismissableMask = true;

    @Output() closed = new EventEmitter<void>();

    severityClasses() {
        switch (this.severity) {
            case 'warning':
                return {
                    badge: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
                    icon: 'pi pi-exclamation-triangle',
                    buttonSeverity: 'warn' as const
                };
            case 'error':
                return {
                    badge: 'bg-red-100 text-red-700 ring-1 ring-red-200',
                    icon: 'pi pi-times-circle',
                    buttonSeverity: 'danger' as const
                };
            case 'info':
                return {
                    badge: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
                    icon: 'pi pi-info-circle',
                    buttonSeverity: 'secondary' as const
                };
            default:
                return {
                    badge: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
                    icon: 'pi pi-check-circle',
                    buttonSeverity: 'success' as const
                };
        }
    }

    close() {
        this.closed.emit();
        this.visible = false;
        this.visibleChange.emit(false);
    }

    handleHide() {
        if (this.visible) {
            this.close();
        }
    }
}
