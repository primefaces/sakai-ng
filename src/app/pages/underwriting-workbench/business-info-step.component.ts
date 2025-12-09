import { Component, model, output, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CheckboxModule } from 'primeng/checkbox';
import { RiskProfile } from '../../core/models/risk-profile.model';
import { KnowledgeBaseService } from '../../core/services/knowledge-base.service';
import { FmcsaService } from '../../core/services/fmcsa.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-business-info-step',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        InputTextModule,
        InputNumberModule,
        SelectModule,
        ButtonModule,
        RadioButtonModule,
        IconFieldModule,
        IconFieldModule,
        InputIconModule,
        CheckboxModule
    ],
    template: `
    <p-card>
        <ng-template pTemplate="header">
            <div class="px-3 pt-3">
                <h3 class="m-0">Business Information</h3>
            </div>
        </ng-template>
        
        <!-- SAFER Search Section -->
        <div class="px-3 pb-2">
            <div class="surface-100 p-3 border-round border-1 surface-border">
                <div class="text-sm font-bold mb-2 text-color">Auto-fill from SAFER (FMCSA)</div>
                
                <div class="flex flex-wrap gap-3 mb-3">
                    <div class="flex align-items-center">
                        <p-radioButton name="searchType" value="usdot" [(ngModel)]="searchType" inputId="usdot"></p-radioButton>
                        <label for="usdot" class="ml-2">USDOT Number</label>
                    </div>
                    <div class="flex align-items-center">
                        <p-radioButton name="searchType" value="mc" [(ngModel)]="searchType" inputId="mc"></p-radioButton>
                        <label for="mc" class="ml-2">MC/MX Number</label>
                    </div>
                    <div class="flex align-items-center">
                        <p-radioButton name="searchType" value="name" [(ngModel)]="searchType" inputId="name"></p-radioButton>
                        <label for="name" class="ml-2">Company Name</label>
                    </div>
                </div>

                <div class="flex gap-2">
                    <p-iconField class="w-full">
                        <p-inputIcon styleClass="pi pi-search" />
                        <input type="text" pInputText [(ngModel)]="searchValue" placeholder="Enter Value to Search" class="w-full" (keydown.enter)="search()" />
                    </p-iconField>
                    <p-button label="Search" [loading]="isSearching" (onClick)="search()"></p-button>
                </div>
            </div>
        </div>

        <div class="formgrid grid mt-2 px-3">
            <!-- Entity Type: Small -->
            <div class="field col-12 md:col-3">
                <label class="font-bold">Entity Type *</label>
                <p-select [(ngModel)]="riskProfile().businessInfo.entityType" [options]="entityTypes()" optionLabel="label" optionValue="value" styleClass="w-full" appendTo="body"></p-select>
            </div>
            
            <!-- Business Name: Large -->
            <div class="field col-12 md:col-9">
                <label class="font-bold">Business Name (Legal) *</label>
                <input pInputText [(ngModel)]="riskProfile().businessInfo.businessName" class="w-full" />
            </div>

            <!-- DBA Name: Medium -->
            <div class="field col-12 md:col-6">
                <label class="font-bold">DBA Name</label>
                <input pInputText [(ngModel)]="riskProfile().businessInfo.dbaName" class="w-full" />
            </div>

            <!-- Owner Info -->
            <div class="field col-12 md:col-6">
                <label class="font-bold">Owner Name *</label>
                <input pInputText [(ngModel)]="riskProfile().businessInfo.ownerName" class="w-full" placeholder="First & Last Name" />
            </div>
            <div class="field col-12 md:col-6">
                <label class="font-bold">Owner Email *</label>
                <input pInputText [(ngModel)]="riskProfile().businessInfo.ownerEmail" class="w-full" placeholder="email@example.com" />
            </div>

            <!-- DOT / MC: Small Identifiers -->
            <div class="field col-6 md:col-3">
                <label class="font-bold">USDOT Number</label>
                <input pInputText [(ngModel)]="riskProfile().businessInfo.dotNumber" class="w-full" />
            </div>
            <div class="field col-6 md:col-3">
                <label class="font-bold">MC Number</label>
                <input pInputText [(ngModel)]="riskProfile().businessInfo.mcNumber" class="w-full" />
            </div>

            <!-- Years / Radius: Metrics -->
            <!-- Giving them slightly more room: 3 cols each on desktop, 6 each on mobile -->
             <div class="field col-6 md:col-3">
                <label class="font-bold block mb-2">Yrs in Biz *</label>
                <p-inputNumber [(ngModel)]="riskProfile().businessInfo.yearsInBusiness" [min]="0" [max]="100" styleClass="w-full" class="w-full" [inputStyle]="{'width': '100%'}"></p-inputNumber>
            </div>
            <div class="field col-6 md:col-3">
                <label class="font-bold block mb-2">Radius (mi) *</label>
                <p-inputNumber [(ngModel)]="riskProfile().businessInfo.operatingRadius" [min]="0" [max]="5000" styleClass="w-full" class="w-full" [inputStyle]="{'width': '100%'}"></p-inputNumber>
            </div>
            <div class="field col-12 md:col-6"></div> <!-- Spacer to fill row (3+3+6=12) -->

            <!-- Address Section -->
             <div class="col-12 mt-2">
                 <div class="surface-100 p-3 border-round border-1 surface-border formgrid grid">
                    <div class="col-12 mb-3 font-bold text-sm text-color-secondary uppercase tracking-wider">Garaging Address</div>
                    
                    <div class="field col-12 md:col-5">
                        <label class="font-bold block mb-2">Street Address *</label>
                        <input pInputText [(ngModel)]="riskProfile().businessInfo.garagingAddress.street" class="w-full" />
                    </div>

                    <div class="field col-12 md:col-3">
                        <label class="font-bold block mb-2">City *</label>
                        <input pInputText [(ngModel)]="riskProfile().businessInfo.garagingAddress.city" class="w-full" />
                    </div>
                    
                    <div class="field col-6 md:col-2">
                        <label class="font-bold block mb-2">State *</label>
                        <p-select [(ngModel)]="riskProfile().businessInfo.garagingAddress.state" [options]="usStates()" optionLabel="label" optionValue="value" styleClass="w-full" appendTo="body" placeholder="State"></p-select>
                    </div>

                    <div class="field col-6 md:col-2">
                        <label class="font-bold block mb-2">ZIP *</label>
                        <input pInputText [(ngModel)]="riskProfile().businessInfo.garagingAddress.zip" class="w-full" />
                    </div>
                 </div>
             </div>

             <!-- Mailing Address Section -->
             <div class="col-12 mt-2">
                 <div class="surface-100 p-3 border-round border-1 surface-border formgrid grid">
                    <div class="col-12 mb-3 flex align-items-center justify-content-between">
                        <span class="font-bold text-sm text-color-secondary uppercase tracking-wider">Mailing Address</span>
                        <div class="flex align-items-center">
                            <p-checkbox [(ngModel)]="sameAsGaraging" [binary]="true" inputId="sameAddress" (onChange)="onSameAddressChange()"></p-checkbox>
                            <label for="sameAddress" class="ml-2 text-sm font-semibold cursor-pointer">Same as Garaging</label>
                        </div>
                    </div>
                    
                    <ng-container *ngIf="!sameAsGaraging">
                        <div class="field col-12 md:col-5">
                            <label class="font-bold block mb-2">Street Address</label>
                            <input pInputText [(ngModel)]="riskProfile().businessInfo.mailingAddress!.street" class="w-full" />
                        </div>

                        <div class="field col-12 md:col-3">
                            <label class="font-bold block mb-2">City</label>
                            <input pInputText [(ngModel)]="riskProfile().businessInfo.mailingAddress!.city" class="w-full" />
                        </div>
                        
                        <div class="field col-6 md:col-2">
                            <label class="font-bold block mb-2">State</label>
                            <p-select [(ngModel)]="riskProfile().businessInfo.mailingAddress!.state" [options]="usStates()" optionLabel="label" optionValue="value" styleClass="w-full" appendTo="body" placeholder="State"></p-select>
                        </div>

                        <div class="field col-6 md:col-2">
                            <label class="font-bold block mb-2">ZIP</label>
                            <input pInputText [(ngModel)]="riskProfile().businessInfo.mailingAddress!.zip" class="w-full" />
                        </div>
                    </ng-container>
                     <ng-container *ngIf="sameAsGaraging">
                        <div class="col-12 text-gray-500 font-italic text-sm pl-2">
                            Matches Garaging Address
                        </div>
                    </ng-container>
                 </div>
             </div>
        </div>
        <div class="step-actions">
            <p-button label="Next: Add Drivers" icon="pi pi-arrow-right" iconPos="right" (onClick)="onNext()"></p-button>
        </div>
    </p-card>
    `,
    styles: [`
        :host { display: block; height: 100%; }
        /* Force card to take full height and be a flex container */
        :host ::ng-deep .p-card { height: 100%; display: flex; flex-direction: column; }
        :host ::ng-deep .p-card-body { flex: 1; display: flex; flex-direction: column; overflow: hidden; padding: 1rem; }
        :host ::ng-deep .p-card-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; padding: 0; }
        
        .field { margin-bottom: 1rem; }
        
        /* Pin actions to bottom */
        .step-actions { 
            display: flex; 
            justify-content: flex-end; 
            gap: 1rem; 
            padding-top: 1rem; 
            margin-top: auto; 
            border-top: 1px solid #e0e0e0; 
            flex-shrink: 0;
            padding-right: 1rem;
        }
    `]
})
export class BusinessInfoStepComponent {
    riskProfile = model.required<RiskProfile>();
    next = output<void>();

    private kbService = inject(KnowledgeBaseService);
    private fmcsaService = inject(FmcsaService);

    entityTypes = computed(() => this.kbService.entityTypes().map(e => ({ label: e.label, value: e.code })));
    usStates = computed(() => this.kbService.usStates().map(s => ({ label: `${s.name} (${s.code})`, value: s.code })));

    yearOptions = computed(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 50 }, (_, i) => currentYear - i);
    });

    searchType: 'usdot' | 'mc' | 'name' = 'usdot';
    searchValue = '';
    isSearching = false;
    sameAsGaraging = true;

    search() {
        if (!this.searchValue) {
            Swal.fire({
                title: 'Input Required',
                text: 'Please enter a value to search',
                icon: 'warning',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        this.isSearching = true;

        Swal.fire({
            title: 'Searching SAFER...',
            text: 'Fetching company data from FMCSA',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        this.fmcsaService.searchCarrier(this.searchType, this.searchValue).subscribe({
            next: (data) => {
                this.isSearching = false;
                if (data) {
                    Swal.fire({
                        title: 'Found!',
                        text: 'Company data loaded successfully',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    this.populateForm(data);
                } else {
                    Swal.fire({
                        title: 'Not Found',
                        text: 'No carrier found with that information',
                        icon: 'error'
                    });
                }
            },
            error: () => {
                this.isSearching = false;
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to search SAFER API',
                    icon: 'error'
                });
            }
        });
    }

    populateForm(data: any) {
        // Infer Entity Type from name
        let inferredEntity: 'LLC' | 'CORP' | 'INDIVIDUAL' | 'PARTNERSHIP' | 'OTHER' = 'OTHER';
        const nameUpper = (data.legalName || '').toUpperCase();

        if (nameUpper.includes('LLC') || nameUpper.includes('L.L.C.')) inferredEntity = 'LLC';
        else if (nameUpper.includes('INC') || nameUpper.includes('CORP') || nameUpper.includes('LTD')) inferredEntity = 'CORP';
        else if (!nameUpper.includes('LLC') && !nameUpper.includes('INC')) inferredEntity = 'INDIVIDUAL'; // Fallback guess

        this.riskProfile.update(current => ({
            ...current,
            businessInfo: {
                ...current.businessInfo,
                entityType: inferredEntity as any,
                businessName: data.legalName || data.dbaName || '',
                dbaName: data.dbaName || '',
                dotNumber: data.dotNumber ? data.dotNumber.toString() : '',
                mcNumber: data.docketNumber ? data.docketNumber.toString() : '',
                garagingAddress: {
                    street: data.phyStreet ? data.phyStreet.trim() : '',
                    city: data.phyCity || '',
                    state: data.phyState || '',
                    zip: data.phyZipcode || ''
                },
                mailingAddress: { // Default to garaging initially, or use mail fields if they exist
                    street: data.phyStreet ? data.phyStreet.trim() : '',
                    city: data.phyCity || '',
                    state: data.phyState || '',
                    zip: data.phyZipcode || ''
                }
            }
        }));
    }

    onSameAddressChange() {
        if (this.sameAsGaraging) {
            this.syncAddresses();
        }
    }

    syncAddresses() {
        const garaging = this.riskProfile().businessInfo.garagingAddress;
        this.riskProfile.update(current => ({
            ...current,
            businessInfo: {
                ...current.businessInfo,
                mailingAddress: { ...garaging }
            }
        }));
    }

    // Override next emit to sync before moving on
    onNext() {
        if (this.sameAsGaraging) {
            this.syncAddresses();
        }
        this.next.emit();
    }
}
