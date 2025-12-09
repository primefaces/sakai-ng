import { Component, model, output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';
import { RiskProfile } from '../../core/models/risk-profile.model';
import { CarrierValidationService } from '../../core/services/carrier-validation.service';
import { QuoteService } from '../../core/services/quote.service';
import { Quote, QuoteSubmission } from '../../core/models/quote.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-carrier-validation-step',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        TableModule,
        TagModule,
        CardModule,
        DialogModule,
        DividerModule,
        CheckboxModule,
        TextareaModule,
        BadgeModule
    ],
    template: `
    <div class="step-container">
        <!-- Header -->
        <div class="mb-3 flex justify-content-between align-items-end">
            <div>
                <h2 class="text-xl font-bold mb-1">Market Eligibility & Submission</h2>
                <p class="text-gray-600 m-0 text-sm">Select the markets you wish to submit to</p>
            </div>
            <div class="flex gap-2">
                <p-button label="Save as Draft" icon="pi pi-save" severity="secondary" [outlined]="true" (onClick)="saveQuoteAsDraft()" [loading]="savingQuote"></p-button>
                <div class="flex align-items-center">
                    <strong class="text-primary mr-2">{{ selectedCarriers.length }}</strong> Markets Selected
                </div>
            </div>
        </div>

        <div class="card p-0 flex-1 overflow-hidden flex flex-column border-none shadow-none">
            <p-table 
                [value]="validationResults()" 
                [scrollable]="true" 
                scrollHeight="flex"
                styleClass="p-datatable-gridlines p-datatable-sm font-bold"
                [rowHover]="true"
                [(selection)]="selectedCarriers"
                dataKey="carrierId"
                responsiveLayout="stack"
                breakpoint="960px">
                <ng-template pTemplate="header">
                    <tr class="surface-100">
                        <th style="width: 4rem">
                            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                        </th>
                        <th style="width: 250px">Market</th>
                        <th style="width: 120px">Status</th>
                        <th>Analysis / Reasoning</th>
                        <th style="width: 100px" class="text-center">Action</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-result>
                    <tr [class.bg-red-50]="result.status === 'knockout'" 
                        [class.bg-green-50]="result.status === 'eligible'"
                        class="cursor-pointer transition-colors transition-duration-200 hover:surface-200"
                        (click)="onRowClick(result)">
                        <td>
                            <p-tableCheckbox [value]="result" (click)="$event.stopPropagation()"></p-tableCheckbox>
                        </td>
                        <td>
                            <div class="flex flex-column gap-2">
                                <span class="font-bold text-lg">{{ result.carrierName }}</span>
                                <!-- Distributed Carriers -->
                                <div class="flex gap-1 flex-wrap mt-1" *ngIf="result.marketData?.distributedCarriers && result.marketData.distributedCarriers.length > 0">
                                    <span class="text-xs text-gray-500 w-full mb-0">Sold By / Carriers:</span>
                                    <p-tag *ngFor="let c of result.marketData.distributedCarriers" [value]="c.name" severity="secondary" styleClass="text-xs py-0 px-2"></p-tag>
                                </div>
                                <div class="flex gap-2 flex-wrap mt-1" *ngIf="result.marketData">
                                    <p-badge *ngIf="result.marketData.tier" [value]="result.marketData.tier" severity="info" styleClass="text-xs"></p-badge>
                                    <p-tag *ngIf="result.marketData.retention" icon="pi pi-shield" [value]="result.marketData.retention" severity="contrast" styleClass="text-xs py-1"></p-tag>
                                    <p-tag *ngIf="result.marketData.newVentureFit" icon="pi pi-briefcase" [value]="'NV: ' + result.marketData.newVentureFit" [severity]="result.marketData.newVentureFit === 'No' ? 'danger' : 'success'" styleClass="text-xs py-1"></p-tag>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p-tag 
                                [value]="result.status | uppercase" 
                                [severity]="getSeverity(result.status)"
                                styleClass="font-bold border-1">
                            </p-tag>
                        </td>
                        <td>
                             @if (result.status === 'eligible') {
                                <div class="flex align-items-center text-green-700">
                                    <i class="pi pi-check-circle mr-2 text-xl"></i>
                                    <span class="font-medium">Risk profile fits broad acceptance criteria.</span>
                                </div>
                            } @else {
                                <div class="flex flex-column gap-1">
                                    @for (reason of result.failedChecks; track reason.questionId) {
                                        <div class="flex align-items-center text-red-700">
                                            <i class="pi pi-times-circle mr-2"></i>
                                            <span class="font-medium">{{ reason.reason }}</span>
                                        </div>
                                    }
                                </div>
                            }
                        </td>
                        <td class="text-center">
                            <p-button label="Guidelines" icon="pi pi-list" [outlined]="true" size="small" (onClick)="openDetails(result); $event.stopPropagation()"></p-button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>

        <div class="flex justify-content-between mt-3 pt-3 border-top-1 surface-border">
            <p-button label="Back" icon="pi pi-arrow-left" [outlined]="true" severity="secondary" (onClick)="prev.emit()"></p-button>
            <p-button label="Generate Submission" icon="pi pi-envelope" iconPos="right" severity="success" (onClick)="generateSubmission()"></p-button>
        </div>

        <!-- Guidelines Dialog -->
        <p-dialog 
            [(visible)]="displayDialog" 
            [header]="selectedResult?.carrierName + ' - Analysis'" 
            [modal]="true" 
            [style]="{width: '50vw'}" 
            [draggable]="false" 
            [resizable]="false"
            styleClass="brutal-dialog">
            
            @if (selectedResult) {
                <div class="flex flex-column gap-4 p-3">
                     <!-- Probability Score Banner -->
                    <div class="p-4 border-round-xl flex align-items-center justify-content-between shadow-2"
                        [ngClass]="{
                            'bg-green-50 surface-border border-2 border-green-500': selectedResult.score >= 80,
                            'bg-yellow-50 surface-border border-2 border-yellow-500': selectedResult.score >= 50 && selectedResult.score < 80,
                            'bg-red-50 surface-border border-2 border-red-500': selectedResult.score < 50
                        }">
                        <div class="flex flex-column gap-2">
                            <div>
                                <span class="text-xl font-bold mb-1 text-gray-800">Match Probability</span>
                                <div class="text-sm text-gray-600">Based on your risk profile</div>
                            </div>
                            
                            <!-- NEW RICH TAGS -->
                            <div class="flex gap-2 flex-wrap mt-2">
                                <p-tag icon="pi pi-star" [value]="selectedResult.marketData?.tier || 'Standard'" severity="info"></p-tag>
                                <p-tag icon="pi pi-shield" [value]="'Retention: ' + (selectedResult.marketData?.retention || 'Standard')" severity="contrast"></p-tag>
                                <p-tag icon="pi pi-briefcase" 
                                       [value]="'NV: ' + (selectedResult.marketData?.newVentureFit || 'See Notes')" 
                                       [severity]="selectedResult.marketData?.newVentureFit === 'No' ? 'danger' : 'success'"
                                       [class.glow-success]="isNewVenture() && selectedResult.marketData?.newVentureFit !== 'No'">
                                </p-tag>
                            </div>
                            
                            <!-- Submission Email Display -->
                            <div class="flex align-items-center gap-2 mt-2" *ngIf="selectedResult.marketData?.submissionEmail">
                                <i class="pi pi-envelope text-600"></i>
                                <span class="font-bold text-700 select-all">{{ selectedResult.marketData.submissionEmail }}</span>
                            </div>
                        </div>
                        <div class="flex flex-column align-items-end">
                             <span class="text-5xl font-black mr-2"
                                [ngClass]="{
                                    'text-green-600': selectedResult.score >= 80,
                                    'text-yellow-600': selectedResult.score >= 50 && selectedResult.score < 80,
                                    'text-red-600': selectedResult.score < 50
                                }">{{ selectedResult.score }}%</span>
                             <p-badge *ngIf="selectedResult.score >= 85" value="BEST FIT" severity="success" styleClass="mt-2"></p-badge>
                        </div>
                    </div>
                    
                    <div class="grid">
                        <!-- Met Requirements -->
                        <div class="col-12">
                            <h3 class="text-lg font-bold text-green-700 mb-3 flex align-items-center">
                                <i class="pi pi-check-circle mr-2"></i>
                                Met Requirements
                            </h3>
                            @if (selectedResult.passedChecks.length > 0) {
                                <ul class="list-none p-0 m-0 flex flex-column gap-2">
                                    @for (pass of selectedResult.passedChecks; track pass) {
                                        <li class="p-3 surface-50 border-round border-left-3 border-green-500 font-medium text-gray-700 flex align-items-center">
                                            <i class="pi pi-check text-green-500 mr-3"></i>
                                            {{ pass }}
                                        </li>
                                    }
                                </ul>
                            } @else {
                                <div class="text-gray-500 italic p-2">No specific requirements met.</div>
                            }
                        </div>

                        <!-- Unmet Requirements -->
                        <div class="col-12 mt-2">
                            <h3 class="text-lg font-bold text-red-700 mb-3 flex align-items-center">
                                <i class="pi pi-times-circle mr-2"></i>
                                Unmet Guidelines (Knockouts)
                            </h3>
                            @if (selectedResult.failedChecks.length > 0) {
                                <ul class="list-none p-0 m-0 flex flex-column gap-2">
                                    @for (fail of selectedResult.failedChecks; track fail.questionId) {
                                        <li class="p-3 bg-red-50 border-round border-left-3 border-red-500 flex flex-column">
                                            <div class="flex align-items-center mb-1">
                                                <i class="pi pi-ban text-red-600 mr-2"></i>
                                                <span class="font-bold text-gray-800">{{ fail.question }}</span>
                                            </div>
                                            <span class="text-red-700 md:ml-5 text-sm line-height-3">{{ fail.reason }}</span>
                                        </li>
                                    }
                                </ul>
                            } @else {
                                <div class="p-3 bg-green-50 text-green-700 border-round border-1 border-green-200">
                                    <i class="pi pi-thumbs-up mr-2"></i> No unmet requirements!
                                </div>
                            }
                        </div>
                    </div>

                    <!-- Underwriter Notes -->
                    @if (selectedResult.marketData?.requirements?.notes) {
                        <div class="surface-100 p-3 border-round">
                            <h4 class="m-0 mb-2 font-bold text-gray-800 text-sm uppercase tracking-wide">Underwriter Notes</h4>
                            <p class="m-0 text-gray-600 line-height-3 text-sm italic">{{ selectedResult.marketData.requirements.notes }}</p>
                        </div>
                    }
                </div>
            }
        </p-dialog>

        <!-- Draft Dialog -->
        <p-dialog 
            [(visible)]="displayDraftDialog" 
            header="Submission Draft" 
            [modal]="true" 
            [style]="{width: '60vw'}"
            styleClass="brutal-dialog">
            <div class="flex flex-column gap-3">
                <p class="text-gray-600 m-0">The following text has been generated for your submission emails.</p>
                
                <textarea 
                    pInputTextarea 
                    [rows]="20" 
                    class="w-full font-mono text-sm line-height-3" 
                    [(ngModel)]="draftText" 
                    [autoResize]="false"></textarea>

                <div class="flex justify-content-end gap-2">
                    <p-button label="Copy to Clipboard" icon="pi pi-copy" severity="secondary" (onClick)="copyToClipboard()"></p-button>
                    <p-button label="Open Email Client" icon="pi pi-external-link" (onClick)="openMailClient()"></p-button>
                </div>
            </div>
        </p-dialog>

    </div>
    `,
    styles: [`
        :host { display: block; height: 100%; }
        .step-container { padding: 0.5rem; height: 100%; display: flex; flex-direction: column; }
        
        /* Neobrutalist Dialog Override */
        :host ::ng-deep .brutal-dialog .p-dialog-header {
            background: #2D2D2D;
            color: #fff;
            border-bottom: 3px solid #000;
        }

        @keyframes glow-green {
            0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
            100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        :host ::ng-deep .glow-success {
            animation: glow-green 2s infinite;
            border: 1px solid #22c55e !important;
        }
    `]
})
export class CarrierValidationStepComponent {
    riskProfile = model.required<RiskProfile>();
    prev = output<void>();
    next = output<void>();

    private validationService = inject(CarrierValidationService);
    private quoteService = inject(QuoteService);
    private router = inject(Router);
    private clipboard = inject(Clipboard);

    validationResults = computed(() => this.validationService.validate(this.riskProfile()));
    isNewVenture = computed(() => (this.riskProfile().businessInfo.yearsInBusiness || 0) < 2);

    displayDialog = false;
    displayDraftDialog = false;
    selectedResult: any = null;
    selectedCarriers: any[] = [];
    draftText = '';
    savingQuote = false;

    // Auto-select eligible carriers on load
    constructor() { }

    submit() {
        this.next.emit();
    }

    getSeverity(status: string): 'success' | 'danger' | 'warn' | 'info' | 'secondary' | 'contrast' | undefined {
        switch (status) {
            case 'eligible': return 'success';
            case 'knockout': return 'danger';
            case 'warning': return 'warn';
            default: return 'info';
        }
    }

    openDetails(result: any) {
        this.selectedResult = result;
        this.displayDialog = true;
    }

    // Toggle selection on row click if not actionable
    onRowClick(result: any) {
        const idx = this.selectedCarriers.findIndex(c => c.carrierId === result.carrierId);
        if (idx > -1) {
            this.selectedCarriers = this.selectedCarriers.filter(c => c.carrierId !== result.carrierId);
        } else {
            this.selectedCarriers = [...this.selectedCarriers, result];
        }
    }

    async saveQuoteAsDraft() {
        const profile = this.riskProfile();

        // Map Workbench Profile to Quote Model
        const submissions: QuoteSubmission[] = this.selectedCarriers.map(carrier => ({
            mgaId: carrier.carrierId,
            mgaName: carrier.carrierName,
            coverageType: 'Package', // Default or derived
            status: 'PENDING',
            notes: 'Added from Market Finder'
        }));

        const quoteData: Partial<Quote> = {
            status: 'DRAFT',
            client: {
                businessName: profile.businessInfo.businessName,
                dotNumber: profile.businessInfo.dotNumber || '',
                contactName: profile.businessInfo.ownerName || 'N/A',
                email: profile.businessInfo.ownerEmail || 'N/A',
                phone: 'N/A',
                garagingAddress: `${profile.businessInfo.garagingAddress.city}, ${profile.businessInfo.garagingAddress.state} ${profile.businessInfo.garagingAddress.zip}`,
                mailingAddress: profile.businessInfo.mailingAddress
                    ? `${profile.businessInfo.mailingAddress.city}, ${profile.businessInfo.mailingAddress.state} ${profile.businessInfo.mailingAddress.zip}`
                    : `${profile.businessInfo.garagingAddress.city}, ${profile.businessInfo.garagingAddress.state} ${profile.businessInfo.garagingAddress.zip}`
            },
            risk: {
                drivers: profile.drivers,
                vehicles: profile.vehicles,
                cargoCommodities: profile.operations.cargoCommodities
            },
            submissions: submissions,
            pricing: {
                targetPremium: 0 // Placeholder
            }
        };

        this.savingQuote = true;
        try {
            const id = await this.quoteService.createQuote(quoteData);

            Swal.fire({
                title: 'Quote Saved!',
                text: 'Your quote has been saved as a draft. You can now manage it in "My Quotes".',
                icon: 'success',
                confirmButtonText: 'View Quote',
                confirmButtonColor: '#22c55e',
                showCancelButton: true,
                cancelButtonText: 'Stay Here'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.router.navigate(['/quotes', id]);
                }
            });

        } catch (error: any) {
            // Only show generic error if it wasn't the auth error (which already showed a specific alert)
            if (error.message !== 'User not authenticated') {
                Swal.fire('Error', 'Failed to save quote. Please try again.', 'error');
            }
        } finally {
            this.savingQuote = false;
        }
    }

    generateSubmission() {
        if (this.selectedCarriers.length === 0) {
            Swal.fire('No Markets Selected', 'Please select at least one market to generate a submission.', 'warning');
            return;
        }

        const profile = this.riskProfile();
        const units = profile.vehicles.map((v, i) => {
            const pd = v.statedAmount ? `$${v.statedAmount.toLocaleString()}` : 'Liability Only';
            return `Unit #${i + 1}: ${v.year} ${v.make} ${v.model} (VIN: ${v.vin}) - Val: ${pd}`;
        }).join('\n');

        const drivers = profile.drivers.map(d => {
            const exp = d.yearsExperience ? `${d.yearsExperience} yrs exp` : 'N/A';
            const age = d.age ? `${d.age} yrs old` : 'Unknown Age';
            return `- ${d.name} (${age}, ${exp})`;
        }).join('\n');

        const commodities = profile.operations.cargoCommodities.join(', ');

        const coverages = `
        Liability: $${(profile.coverage.liabilityLimit || 0).toLocaleString()}
        Cargo: ${profile.coverage.cargoLimit ? '$' + profile.coverage.cargoLimit.toLocaleString() : 'Not Requested'}
        Deductibles: Cargo $${profile.coverage.cargoDeductible || 'N/A'}
        Physical Damage: ${profile.coverage.physicalDamage ? 'Yes' : 'No'}
        PD Deductibles: Comp $${profile.coverage.physicalDamageDeductibles?.comp || 'N/A'} / Coll $${profile.coverage.physicalDamageDeductibles?.coll || 'N/A'}
        `;

        const subCoverages = Object.keys(profile.coverage.selectedSubCoverages || {}).map(key => {
            return `${key.replace(/_/g, ' ')}: ${(profile.coverage.selectedSubCoverages as any)[key].join(', ')}`;
        }).join('\n');


        this.draftText = `
SUBMISSION REQUEST: ${profile.businessInfo.businessName}

DOT: ${profile.businessInfo.dotNumber || 'Pending'}
MC: ${profile.businessInfo.mcNumber || 'Pending'}
Address: ${profile.businessInfo.garagingAddress.city}, ${profile.businessInfo.garagingAddress.state} ${profile.businessInfo.garagingAddress.zip}

--- OPERATIONS ---
Years in Business: ${profile.businessInfo.yearsInBusiness}
Commodities: ${commodities}
Radius: ${profile.businessInfo.operatingRadius} miles
Prior Insurance: ${profile.hasPriorInsurance ? 'Yes (' + profile.priorInsuranceYears + ' years)' : 'No'}
Dash Cam: ${profile.willingToInstallDashCam ? 'Willing to Install' : 'No'}
ELD: ${profile.hasEld ? 'Yes' : 'No'}

--- COVERAGE REQUESTED ---
${coverages}

Specific Endorsements:
${subCoverages}

--- DRIVERS ---
${drivers}

--- VEHICLES ---
${units}

--- SELECTED MARKETS ---
${this.selectedCarriers.map(c => c.carrierName).join(', ')}
        `.trim();

        this.displayDraftDialog = true;
    }

    copyToClipboard() {
        this.clipboard.copy(this.draftText);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Copied to clipboard',
            showConfirmButton: false,
            timer: 2000
        });
    }

    openMailClient() {
        const subject = `Submission: ${this.riskProfile().businessInfo.businessName}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(this.draftText)}`);
    }
}
