import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { QuoteService } from '../../core/services/quote.service';
import { Quote, QuoteStatus } from '../../core/models/quote.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, InputTextModule],
  providers: [],
  template: `
    <div class="quote-list-container">
      <div class="header-section">
        <h1>Gestión de Cotizaciones</h1>
        <div class="flex gap-2">
            <p-button 
                label="Refresh" 
                icon="pi pi-refresh" 
                [outlined]="true"
                severity="secondary"
                (onClick)="refreshQuotes()"
                [loading]="loading()">
            </p-button>
            <button pButton label="Nueva Cotización" icon="pi pi-plus" class="p-button-primary" severity="primary" (click)="createNewQuote()"></button>
        </div>
      </div>

      <p-table 
        #dt
        [value]="quotes()" 
        [loading]="loading()"
        [paginator]="true"
        [rows]="10"
        [rowsPerPageOptions]="[10, 25, 50]"
        [globalFilterFields]="['client.businessName', 'client.dotNumber', 'status']"
        styleClass="p-datatable-sm shadow-2 border-round">
        
        <ng-template pTemplate="caption">
            <div class="flex">
                <span class="p-input-icon-left ml-auto">
                    <i class="pi pi-search" style="left: 1rem"></i>
                    <input pInputText type="text" (input)="dt.filterGlobal($any($event.target).value, 'contains')" placeholder="Search keyword" style="padding-left: 3rem" />
                </span>
            </div>
        </ng-template>

        <ng-template pTemplate="header">
          <tr>
            <th>Client Name</th>
            <th>Owner Name</th>
            <th>DOT Number</th>
            <th>Status</th>
            <th>Markets</th>
            <th>Quoted Price</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        
        <ng-template pTemplate="body" let-quote>
          <tr>
            <td>
                <span class="font-bold">{{ quote.client?.businessName || 'Unknown Client' }}</span>
            </td>
            <td>{{ quote.client?.contactName || '-' }}</td>
            <td>{{ quote.client?.dotNumber || '-' }}</td>
            <td>
              <p-tag 
                [value]="quote.status" 
                [severity]="getStatusSeverity(quote.status)">
              </p-tag>
            </td>
            <td>
                <span class="text-gray-600">{{ quote.submissions?.length || 0 }} Submissions</span>
            </td>
            <td>
                <span class="font-bold text-green-600">
                    {{ quote.pricing?.quotedPremium ? ('$' + quote.pricing.quotedPremium.toLocaleString()) : '-' }}
                </span>
            </td>
            <td>{{ formatDate(quote.createdAt) }}</td>
            <td>
              <div class="action-buttons">
                <p-button 
                  icon="pi pi-eye" 
                  (onClick)="viewQuote(quote)"
                  [rounded]="true"
                  [text]="true"
                  severity="secondary"
                  pTooltip="View Details">
                </p-button>
                <p-button 
                  icon="pi pi-trash" 
                  (onClick)="deleteQuote(quote)"
                  [rounded]="true"
                  [text]="true"
                  severity="danger"
                  pTooltip="Delete">
                </p-button>
              </div>
            </td>
          </tr>
        </ng-template>
        
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="7" class="empty-message">
              <div class="empty-state">
                <i class="pi pi-inbox" style="font-size: 3rem; color: #999;"></i>
                <h3>No quotes yet</h3>
                <p>Start a new underwriting process to create a quote</p>
                <p-button 
                  label="Start Underwriting" 
                  icon="pi pi-bolt"
                  (onClick)="createNewQuote()">
                </p-button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [`
    .quote-list-container {
      padding: 2rem;
      max-width: 1600px;
      margin: 0 auto;
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header-section h1 {
      color: var(--text-color);
      margin: 0;
      font-size: 2rem;
    }

    /* Removed hardcoded button styles to allow Severity/Outlined inputs to work */

    /* Removed hardcoded table header styles to allow Theme to handle Dark Mode */
    
    .action-buttons {
      display: flex;
      gap: 0.25rem;
    }

    .empty-message {
      text-align: center;
    }

    .empty-state {
      padding: 3rem 2rem;
    }

    .empty-state h3 {
      margin: 1rem 0 0.5rem 0;
      color: var(--text-color);
    }

    .empty-state p {
      color: var(--text-color-secondary);
      margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
      .quote-list-container {
        padding: 1rem;
      }

      .header-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `]
})
export class QuoteListComponent implements OnInit {
  private quoteService = inject(QuoteService);
  private router = inject(Router);

  // Using Service Signals directly
  quotes = this.quoteService.quotes;
  loading = this.quoteService.loading;

  ngOnInit(): void {
    // QuoteService now auto-loads on auth, but we can force load too
    if (this.quoteService.quotes().length === 0) {
      this.quoteService.loadUserQuotes();
    }
  }

  getStatusSeverity(status: QuoteStatus): any {
    const severityMap: Record<QuoteStatus, any> = {
      'DRAFT': 'secondary',
      'SUBMITTED': 'info',
      'QUOTED': 'warn',
      'BOUND': 'success',
      'DENIED': 'danger'
    };
    return severityMap[status];
  }

  formatDate(timestamp: any): string {
    if (!timestamp) return '-';
    // Handle both Firestore Timestamp and JS Date/String
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString();
  }

  createNewQuote(): void {
    this.router.navigate(['/underwriting']);
  }

  refreshQuotes(): void {
    this.quoteService.loadUserQuotes().then(() => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Quotes Refreshed',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  viewQuote(quote: Quote): void {
    this.router.navigate(['/quotes', quote.id]);
  }

  deleteQuote(quote: Quote): void {
    Swal.fire({
      title: 'Delete Quote?',
      text: `Are you sure you want to delete the quote for "${quote.client?.businessName || 'this client'}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Show loading
          Swal.fire({
            title: 'Deleting...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
          });

          await this.quoteService.deleteQuote(quote.id!);

          Swal.fire({
            title: 'Deleted!',
            text: 'Quote has been deleted.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });

        } catch (error) {
          Swal.fire('Error', 'Failed to delete quote.', 'error');
        }
      }
    });
  }
}
