import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-scrollable-modal',
    standalone: true,
    imports: [CommonModule, DialogModule],
    template: `
        <p-dialog
            [(visible)]="visible"
            [modal]="true"
            [closable]="closable"
            [dismissableMask]="dismissableMask"
            [draggable]="false"
            [resizable]="false"
            [style]="dialogStyle"
            [breakpoints]="{ '960px': '92vw', '640px': '96vw' }"
            [contentStyle]="contentStyle"
            [baseZIndex]="1200"
            (onHide)="handleHide()"
        >
            <ng-template #header>
                <div class="flex items-center justify-between gap-4">
                    <div class="min-w-0">
                        <div class="text-lg font-semibold text-white">{{ header }}</div>
                        <div class="mt-1 text-sm text-white/65" *ngIf="subtitle">{{ subtitle }}</div>
                    </div>
                </div>
            </ng-template>

            <div class="space-y-4">
                <ng-content></ng-content>
            </div>
        </p-dialog>
    `,
    styles: [
        `
            :host ::ng-deep .p-dialog {
                border: 1px solid rgba(255, 255, 255, 0.08);
                background: linear-gradient(180deg, rgba(22, 22, 22, 0.98), rgba(8, 8, 8, 0.98));
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
export class ScrollableModalComponent {
    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();

    @Input() header = 'Modal';
    @Input() subtitle = '';
    @Input() width = 'min(56rem, 92vw)';
    @Input() maxHeight = '80vh';
    @Input() closable = true;
    @Input() dismissableMask = true;

    @Output() closed = new EventEmitter<void>();

    get dialogStyle() {
        return {
            width: this.width,
            maxWidth: '94vw'
        };
    }

    get contentStyle() {
        return {
            maxHeight: this.maxHeight,
            overflow: 'auto'
        };
    }

    handleHide() {
        if (this.visible) {
            this.closed.emit();
            this.visible = false;
            this.visibleChange.emit(false);
        }
    }
}
