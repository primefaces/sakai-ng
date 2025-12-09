import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { QuoteService } from '../../core/services/quote.service';
import { Quote, QuoteStatus, QuoteSubmission } from '../../core/models/quote.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quote-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TagModule,
    TableModule,
    DividerModule,
    InputNumberModule,
    TextareaModule,
    SelectModule,
    TooltipModule,
    DialogModule
  ],
  template: `
    <div class="page-container p-4 min-h-screen surface-ground">
      
      <!-- Actions Bar -->
      <div class="mb-4 flex flex-wrap gap-2 justify-content-between align-items-center max-w-7xl mx-auto">
        <p-button label="Back to Quotes" icon="pi pi-arrow-left" [outlined]="true" severity="secondary" (onClick)="goBack()"></p-button>
        
        <div class="flex gap-2">
            @if (quote()) {
                <p-button label="Download PDF" icon="pi pi-file-pdf" [outlined]="true" severity="help"></p-button>
                <p-button label="Save Changes" icon="pi pi-save" (onClick)="saveChanges()" [loading]="saving()" severity="success"></p-button>
            }
        </div>
      </div>

      @if (quote(); as q) {
        <div class="paper-quote max-w-7xl mx-auto surface-card p-6 shadow-4 border-round-xl relative">
            
            <!-- Watermark for Status -->
            <div class="watermark" [ngClass]="q.status.toLowerCase()">{{ q.status }}</div>

            <!-- Header Section -->
            <div class="grid mb-6 border-bottom-1 surface-border pb-4">
                <div class="col-12 md:col-6 flex flex-column gap-2">
                    <img src="logo.png" alt="AJM Logo" height="50" class="mb-2" style="object-fit: contain; object-position: left;">
                    <div class="text-sm text-gray-600">
                        <p class="m-0 font-bold">AJM Insurance Services</p>
                        <p class="m-0">123 Insurance Way</p>
                        <p class="m-0">Austin, TX 78701</p>
                        <p class="m-0">(512) 555-0123</p>
                    </div>
                </div>
                <div class="col-12 md:col-6 text-right md:flex flex-column align-items-end">
                    <h1 class="text-4xl text-900 font-bold m-0 mb-2">INSURANCE QUOTE</h1>
                    <div class="text-right">
                        <p class="m-0 text-gray-600"><span class="font-bold">Quote ID:</span> {{ q.id?.slice(0, 8) | uppercase }}</p>
                        <p class="m-0 text-gray-600"><span class="font-bold">Date:</span> {{ formatDate(q.createdAt) }}</p>
                        <div class="mt-2 flex align-items-center justify-content-end gap-2">
                             <span class="font-bold text-gray-800">Status:</span>
                             <p-select 
                                [options]="statusOptions" 
                                [(ngModel)]="currentStatus" 
                                (onChange)="onStatusChange()"
                                styleClass="p-inputtext-sm"
                                [panelStyle]="{'font-size': '14px'}">
                                <ng-template pTemplate="selectedItem">
                                    <p-tag [value]="currentStatus" [severity]="getStatusSeverity(currentStatus)"></p-tag>
                                </ng-template>
                                <ng-template pTemplate="item" let-item>
                                    <p-tag [value]="item.label" [severity]="getStatusSeverity(item.value)"></p-tag>
                                </ng-template>
                             </p-select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid mb-6">
                <!-- Client Info -->
                <div class="col-12 md:col-6">
                    <div class="surface-50 p-4 border-round h-full">
                        <h3 class="text-lg font-bold text-900 border-bottom-1 surface-border pb-2 mb-3">Client Details</h3>
                        <p class="m-0 text-xl font-bold text-900 mb-2">{{ q.client.businessName }}</p>
                        <div class="text-gray-700 flex flex-column gap-1">
                            <div><i class="pi pi-id-card mr-2 text-primary"></i>DOT: {{ q.client.dotNumber }}</div>
                            <div><i class="pi pi-map-marker mr-2 text-primary"></i>{{ q.client.garagingAddress }}</div>
                            <div><i class="pi pi-user mr-2 text-primary"></i>{{ q.client.contactName }}</div>
                            <div><i class="pi pi-envelope mr-2 text-primary"></i>{{ q.client.email }}</div>
                        </div>
                    </div>
                </div>

                <!-- Premium Summary (Editable) -->
                <div class="col-12 md:col-6">
                    <div class="bg-gray-900 p-4 border-round h-full text-white relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-3 opacity-10">
                            <i class="pi pi-dollar text-6xl"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white-alpha-90 border-bottom-1 border-white-alpha-20 pb-2 mb-3">Premium Summary</h3>
                        
                        <div class="flex flex-column gap-3">
                            <div class="flex justify-content-between align-items-center">
                                <span class="text-white-alpha-80">Quoted Premium</span>
                                <div class="flex align-items-center gap-2">
                                    <span class="text-green-500 font-bold text-xl">$</span>
                                    <p-inputNumber 
                                        [(ngModel)]="q.pricing.quotedPremium" 
                                        mode="decimal" 
                                        [minFractionDigits]="2" 
                                        [maxFractionDigits]="2"
                                        placeholder="0.00"
                                        class="premium-input-dark">
                                    </p-inputNumber>
                                </div>
                            </div>

                            <div class="flex justify-content-between align-items-center">
                                <span class="text-white-alpha-80">Down Payment</span>
                                <div class="flex align-items-center gap-2">
                                    <span class="text-white font-bold text-lg">$</span>
                                    <p-inputNumber 
                                        [(ngModel)]="q.pricing.downPayment" 
                                        mode="decimal" 
                                        [minFractionDigits]="2"
                                        placeholder="0.00"
                                        class="premium-input-dark small">
                                    </p-inputNumber>
                                </div>
                            </div>
                             
                            <div class="flex justify-content-between align-items-center">
                                <span class="text-white-alpha-80">Monthly Payment</span>
                                <div class="flex align-items-center gap-2">
                                    <span class="text-white font-bold text-lg">$</span>
                                    <p-inputNumber 
                                        [(ngModel)]="q.pricing.monthlyPayment" 
                                        mode="decimal" 
                                        [minFractionDigits]="2"
                                        placeholder="0.00"
                                        class="premium-input-dark small">
                                    </p-inputNumber>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Risk Snapshot -->
            <div class="mb-6">
                 <h3 class="text-lg font-bold text-900 mb-3 pl-2 border-left-3 border-primary">Risk Profile</h3>
                 <p-table [value]="q.risk.vehicles" styleClass="p-datatable-sm" [tableStyle]="{'min-width': '50rem'}">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Year</th>
                            <th>Make/Model</th>
                            <th>VIN</th>
                            <th>Value</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-vehicle>
                        <tr>
                            <td>{{ vehicle.year }}</td>
                            <td>{{ vehicle.make }} {{ vehicle.model }}</td>
                            <td>{{ vehicle.vin }}</td>
                            <td>{{ vehicle.statedAmount | currency }}</td>
                        </tr>
                    </ng-template>
                 </p-table>
                 <div class="mt-2 text-sm text-gray-600 pl-2">
                    <span class="font-bold">Drivers:</span> {{ q.risk.drivers.length }} |
                    <span class="font-bold">Commodities:</span> {{ q.risk.cargoCommodities.join(', ') }}
                 </div>
            </div>

            <!-- Market Submissions -->
            <div class="mb-6">
                 <h3 class="text-lg font-bold text-900 mb-3 pl-2 border-left-3 border-primary flex justify-content-between align-items-center">
                    Market Submissions
                    <p-button label="Add Market" icon="pi pi-plus" size="small" [text]="true" (onClick)="openAddMarketDialog()"></p-button>
                 </h3>
                 <p-table [value]="q.submissions" styleClass="p-datatable-gridlines" [tableStyle]="{'min-width': '50rem'}">
                    <ng-template pTemplate="header">
                        <tr class="surface-100">
                            <th>Market (MGA)</th>
                            <th>Status</th>
                            <th>Premium Quoted</th>
                            <th>Notes</th>
                            <th style="width: 50px"></th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-sub let-ri="rowIndex">
                        <tr>
                            <td class="font-bold">{{ sub.mgaName }}</td>
                            <td>
                                <p-select 
                                    [options]="submissionStatuses" 
                                    [(ngModel)]="sub.status"
                                    appendTo="body"
                                    [style]="{'width':'150px'}">
                                     <ng-template pTemplate="selectedItem">
                                        <div class="flex align-items-center gap-2">
                                            <i class="pi" [ngClass]="getSubmissionIcon(sub.status)"></i>
                                            <span>{{ sub.status }}</span>
                                        </div>
                                    </ng-template>
                                     <ng-template pTemplate="item" let-item>
                                        <div class="flex align-items-center gap-2">
                                            <i class="pi" [ngClass]="getSubmissionIcon(item.value)"></i>
                                            <span>{{ item.label }}</span>
                                        </div>
                                    </ng-template>
                                </p-select>
                            </td>
                            <td>
                                <p-inputNumber 
                                    [(ngModel)]="sub.premium" 
                                    mode="currency" 
                                    currency="USD" 
                                    locale="en-US" 
                                    class="w-full"
                                    [inputStyle]="{'width':'100%', 'border':'none', 'background':'transparent'}"
                                    placeholder="Enter Price">
                                </p-inputNumber>
                            </td>
                            <td>
                                <textarea pInputTextarea [(ngModel)]="sub.notes" class="w-full border-none bg-transparent" placeholder="Add notes..." rows="1" autoResize="autoResize"></textarea>
                            </td>
                            <td>
                                <p-button icon="pi pi-trash" [text]="true" severity="danger" (onClick)="removeSubmission(ri)"></p-button>
                            </td>
                        </tr>
                    </ng-template>
                 </p-table>
            </div>

            <!-- Footer -->
            <div class="mt-8 pt-4 border-top-1 surface-border text-center text-gray-500 text-sm">
                Generated by AJM MarketFinder - {{ formatDate(today) }}
            </div>

        </div>
      } @else {
        <div class="flex flex-column align-items-center justify-content-center min-h-screen">
          <i class="pi pi-spin pi-spinner text-4xl mb-3"></i>
          <p>Loading Quote...</p>
        </div>
      }

      <p-dialog 
        [(visible)]="displayAddMarket" 
        header="Add Market Submission" 
        [modal]="true" 
        [style]="{width: '400px'}"
        [draggable]="false"
        [resizable]="false">
            <div class="flex flex-column gap-3 pt-2">
                <label class="font-bold">Select Market</label>
                <p-select 
                    [options]="availableMarkets()" 
                    [(ngModel)]="selectedMarketToAdd" 
                    optionLabel="label" 
                    optionValue="value"
                    [filter]="true"
                    filterBy="label" 
                    placeholder="Search MGA..."
                    styleClass="w-full"
                    appendTo="body">
                </p-select>
            </div>
            <ng-template pTemplate="footer">
                <p-button label="Cancel" (onClick)="displayAddMarket = false" [text]="true" severity="secondary"></p-button>
                <p-button label="Add" (onClick)="addMarket()" [disabled]="!selectedMarketToAdd"></p-button>
            </ng-template>
      </p-dialog>
    </div>
  `,
  styles: [`
    .page-container { background-color: #f1f5f9; }
    .paper-quote { background: white; min-height: 1000px; }
    
    .watermark {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 8rem;
        font-weight: 900;
        opacity: 0.1;
        pointer-events: none;
        z-index: 0;
        text-transform: uppercase;
        border: 10px solid currentColor;
        padding: 1rem 4rem;
    }
    .watermark.draft { color: #94a3b8; }
    .watermark.submitted { color: #3b82f6; }
    .watermark.quoted { color: #eab308; }
    .watermark.bound { color: #22c55e; }
    .watermark.denied { color: #ef4444; }

    :host ::ng-deep .premium-input-dark .p-inputnumber-input {
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        color: white;
        text-align: right;
        font-size: 1.5rem;
        font-weight: bold;
        width: 150px;
        box-shadow: none;
    }
    :host ::ng-deep .premium-input-dark.small .p-inputnumber-input {
        font-size: 1.1rem;
        width: 120px;
    }
    :host ::ng-deep .premium-input-dark .p-inputnumber-input:focus {
        background: rgba(255,255,255,0.2);
        border-color: rgba(255,255,255,0.5);
    }
    `]
})
export class QuoteDetailComponent implements OnInit {
  private quoteService = inject(QuoteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  quote = signal<Quote | undefined>(undefined);
  saving = signal<boolean>(false);
  today = new Date();

  currentStatus: QuoteStatus = 'DRAFT';
  statusOptions = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Submitted', value: 'SUBMITTED' },
    { label: 'Quoted', value: 'QUOTED' },
    { label: 'Bound', value: 'BOUND' },
    { label: 'Denied', value: 'DENIED' }
  ];

  submissionStatuses = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Quoted', value: 'QUOTED' },
    { label: 'Declined', value: 'DECLINED' }
  ];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const quoteId = params['id'];
      if (quoteId) {
        this.loadQuote(quoteId);
      }
    });
  }

  // Dialog
  displayAddMarket = false;
  availableMarkets = signal<any[]>([]);
  selectedMarketToAdd: any = null;

  async loadQuote(id: string) {
    // Since we need to wait for service to maybe load, or just fetch
    await this.quoteService.loadUserQuotes(); // Ensure we have latest
    const q = this.quoteService.getQuoteById(id);
    if (q) {
      this.quote.set(JSON.parse(JSON.stringify(q))); // Deep copy for editing
      this.currentStatus = q.status;
      this.loadMarkets();
    } else {
      Swal.fire('Error', 'Quote not found', 'error');
      this.router.navigate(['/quotes']);
    }
  }

  loadMarkets() {
    // Load MGAs for the dropdown
    import('../../../assets/data/reglas_mga.json').then((data: any) => {
      // Handle both default import and direct array
      const mgas = data.default || data;
      this.availableMarkets.set(mgas.map((m: any) => ({ label: m.name, value: { id: m.id, name: m.name } })));
    });
  }

  getStatusSeverity(status: string): any {
    const map: any = { 'DRAFT': 'secondary', 'SUBMITTED': 'info', 'QUOTED': 'warn', 'BOUND': 'success', 'DENIED': 'danger' };
    return map[status] || 'info';
  }

  getSubmissionIcon(status: string): string {
    const map: any = { 'PENDING': 'pi-clock', 'QUOTED': 'pi-check-circle', 'DECLINED': 'pi-times-circle' };
    return map[status] || 'pi-circle';
  }

  formatDate(timestamp: any): string {
    if (!timestamp) return '-';
    // Handle Firestore Timestamp or Date string
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  onStatusChange() {
    if (this.quote()) {
      this.quote()!.status = this.currentStatus;
    }
  }

  openAddMarketDialog() {
    this.selectedMarketToAdd = null;
    this.displayAddMarket = true;
  }

  addMarket() {
    if (this.selectedMarketToAdd && this.quote()) {
      const existing = this.quote()!.submissions.find(s => s.mgaId === this.selectedMarketToAdd.id);
      if (existing) {
        Swal.fire('Already Added', 'This market is already in the submission list.', 'warning');
        return;
      }

      this.quote()!.submissions.push({
        mgaId: this.selectedMarketToAdd.id,
        mgaName: this.selectedMarketToAdd.name,
        coverageType: 'Package',
        status: 'PENDING',
        premium: 0,
        notes: ''
      });
      this.displayAddMarket = false;
      this.selectedMarketToAdd = null;

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Market Added',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  removeSubmission(index: number) {
    Swal.fire({
      title: 'Remove Market?',
      text: 'Are you sure you want to remove this market submission?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.quote()!.submissions.splice(index, 1);
      }
    });
  }

  async saveChanges() {
    if (!this.quote()?.id) return;

    this.saving.set(true);
    try {
      Swal.fire({
        title: 'Saving...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      await this.quoteService.updateQuote(this.quote()!.id!, this.quote()!);

      Swal.fire({
        title: 'Saved',
        text: 'Quote updated successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to save changes', 'error');
    } finally {
      this.saving.set(false);
    }
  }

  goBack(): void {
    this.router.navigate(['/quotes']);
  }
}
