import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import type { PaginatorState } from 'primeng/types/paginator';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule, PaginatorModule],
    template: `
        <div class="rounded-3xl border border-white/10 bg-black/40 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur">
            <p-paginator
                [first]="first"
                [rows]="rows"
                [totalRecords]="totalRecords"
                [rowsPerPageOptions]="rowsPerPageOptions"
                [showCurrentPageReport]="showCurrentPageReport"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [pageLinkSize]="pageLinkSize"
                styleClass="brand-paginator"
                (onPageChange)="pageChange.emit($event)"
            ></p-paginator>
        </div>
    `,
    styles: [
        `
            :host ::ng-deep .brand-paginator {
                background: transparent;
                border: 0;
                color: #ffffff;
            }

            :host ::ng-deep .brand-paginator .p-paginator-pages .p-paginator-page {
                border-radius: 9999px;
            }
        `
    ]
})
export class PaginationComponent {
    @Input() first = 0;
    @Input() rows = 10;
    @Input() totalRecords = 0;
    @Input() rowsPerPageOptions: number[] = [5, 10, 20];
    @Input() pageLinkSize = 5;
    @Input() showCurrentPageReport = true;
    @Input() currentPageReportTemplate = 'Showing {first} to {last} of {totalRecords}';

    @Output() pageChange = new EventEmitter<PaginatorState>();
}
