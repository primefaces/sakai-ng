import { Component, model, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { RiskProfile, Vehicle } from '../../core/models/risk-profile.model';
import { KnowledgeBaseService } from '../../core/services/knowledge-base.service';
import { inject } from '@angular/core';

@Component({
    selector: 'app-coverage-step',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        SelectModule,
        InputNumberModule,
        CheckboxModule,
        ButtonModule,
        TableModule,
        MessageModule,
        MultiSelectModule
    ],
    template: `
    <div class="step-container">
        <!-- Header -->
        <div class="mb-3">
            <h2 class="text-xl font-bold mb-1">Coverage Requirements</h2>
            <p class="text-gray-600 m-0 text-sm">Configure liability limits and optional physical damage coverage</p>
        </div>

        <div class="grid h-full" style="min-height: 0; flex: 1;">
            <!-- Left Panel: Main Coverages -->
             <div class="col-12 lg:col-5 flex flex-column gap-3">
                <p-card styleClass="h-full">
                    <ng-template pTemplate="header">
                        <div class="p-3 border-bottom-1 surface-border bg-gray-50">
                            <h3 class="font-semibold text-base m-0">General Coverage</h3>
                        </div>
                    </ng-template>
                    
                    <div class="p-4 flex flex-column gap-4">
                        <div class="field">
                            <label class="font-bold block mb-2">Auto Liability Limit <span class="text-red-500">*</span></label>
                            <p-select 
                                [(ngModel)]="riskProfile().coverage.liabilityLimit" 
                                [options]="liabilityLimits" 
                                styleClass="w-full" 
                                placeholder="Select Limit"
                                appendTo="body">
                            </p-select>
                            
                            <!-- Sub Coverages -->
                            <div class="mt-2">
                                <label class="block text-sm font-medium mb-1 text-gray-700">Additional Coverages</label>
                                <p-multiSelect
                                    [options]="autoLiabilityOptions()"
                                    [ngModel]="getSelectedSubCoverages('AUTO_LIABILITY')"
                                    (onChange)="onSubCoverageChange('AUTO_LIABILITY', $event)"
                                    optionLabel="label"
                                    optionValue="id"
                                    placeholder="Select coverages (e.g. Hired Auto)"
                                    styleClass="w-full"
                                    appendTo="body"
                                    display="chip">
                                </p-multiSelect>
                            </div>
                            <small class="text-gray-500 mt-1 block">Mandatory for all carriers</small>
                        </div>

                        <!-- Cargo Coverage Section -->
                        <div class="p-3 surface-50 border-round border-1 surface-border">
                            <div class="field-checkbox mb-3">
                                <p-checkbox 
                                    [binary]="true" 
                                    inputId="cargo-check"
                                    [ngModel]="hasCargo()"
                                    (onChange)="toggleCargo($event.checked)">
                                </p-checkbox>
                                <label for="cargo-check" class="ml-2 font-bold cursor-pointer">Quote Cargo Coverage?</label>
                            </div>
                            
                            @if (hasCargo()) {
                                <div class="field pl-5 animation-duration-200 fadein">
                                    <!-- Cargo Limit & Deductible -->
                                    <div class="formgrid grid">
                                        <div class="field col-12 md:col-6">
                                            <label class="block mb-2 text-sm font-medium">Limit</label>
                                            <p-inputNumber 
                                                [(ngModel)]="riskProfile().coverage.cargoLimit" 
                                                mode="currency" 
                                                currency="USD" 
                                                locale="en-US"
                                                placeholder="$100,000"
                                                styleClass="w-full"
                                                [inputStyle]="{'width': '100%'}"
                                                [min]="0"
                                                [step]="5000">
                                            </p-inputNumber>
                                        </div>
                                        <div class="field col-12 md:col-6">
                                            <label class="block mb-2 text-sm font-medium">Deductible</label>
                                            <p-inputNumber 
                                                [(ngModel)]="riskProfile().coverage.cargoDeductible" 
                                                mode="currency" 
                                                currency="USD" 
                                                locale="en-US"
                                                placeholder="$1,000"
                                                styleClass="w-full"
                                                [inputStyle]="{'width': '100%'}"
                                                [min]="0"
                                                [step]="500">
                                            </p-inputNumber>
                                        </div>
                                    </div>
                                    
                                    <!-- Cargo Sub Coverages (Reefer Breakdown, etc.) -->
                                    <div class="mt-2">
                                        <label class="block text-sm font-medium mb-1 text-gray-700">Cargo Options</label>
                                        <p-multiSelect
                                            [options]="cargoOptions()"
                                            [ngModel]="getSelectedSubCoverages('MOTOR_TRUCK_CARGO')"
                                            (onChange)="onSubCoverageChange('MOTOR_TRUCK_CARGO', $event)"
                                            optionLabel="label"
                                            optionValue="id"
                                            placeholder="Select options"
                                            styleClass="w-full"
                                            appendTo="body"
                                            display="chip">
                                        </p-multiSelect>
                                    </div>
                                </div>
                            }
                        </div>

                        <!-- Physical Damage Section -->
                        <div class="p-3 surface-50 border-round border-1 surface-border">
                            <div class="field-checkbox">
                                <p-checkbox 
                                    [(ngModel)]="riskProfile().coverage.physicalDamage" 
                                    [binary]="true" 
                                    inputId="pd-check"
                                    (onChange)="onPhysicalDamageChange()">
                                </p-checkbox>
                                <label for="pd-check" class="ml-2 font-bold cursor-pointer">Quote Physical Damage?</label>
                            </div>
                             @if (riskProfile().coverage.physicalDamage) {
                                <div class="pl-4 mt-3 animation-duration-200 fadein">
                                    <!-- Deductibles -->
                                     <div class="formgrid grid mb-3" *ngIf="riskProfile().coverage.physicalDamageDeductibles">
                                        <div class="field col-12 md:col-6">
                                            <label class="block mb-2 text-sm font-medium">Comprehensive</label>
                                            <p-inputNumber 
                                                [(ngModel)]="riskProfile().coverage.physicalDamageDeductibles!.comp" 
                                                mode="currency" 
                                                currency="USD" 
                                                locale="en-US"
                                                placeholder="$1,000"
                                                styleClass="w-full"
                                                [inputStyle]="{'width': '100%'}"
                                                [step]="500">
                                            </p-inputNumber>
                                        </div>
                                        <div class="field col-12 md:col-6">
                                            <label class="block mb-2 text-sm font-medium">Collision</label>
                                            <p-inputNumber 
                                                [(ngModel)]="riskProfile().coverage.physicalDamageDeductibles!.coll" 
                                                mode="currency" 
                                                currency="USD" 
                                                locale="en-US"
                                                placeholder="$1,000"
                                                styleClass="w-full"
                                                [inputStyle]="{'width': '100%'}"
                                                [step]="500">
                                            </p-inputNumber>
                                        </div>
                                     </div>

                                    <div class="mb-3">
                                        <label class="block text-sm font-medium mb-1 text-gray-700">Coverage Types</label>
                                        <p-multiSelect
                                            [options]="physicalDamageOptions()"
                                            [ngModel]="getSelectedSubCoverages('PHYSICAL_DAMAGE')"
                                            (onChange)="onSubCoverageChange('PHYSICAL_DAMAGE', $event)"
                                            optionLabel="label"
                                            optionValue="id"
                                            placeholder="Select additional coverages"
                                            styleClass="w-full"
                                            appendTo="body"
                                            display="chip">
                                        </p-multiSelect>
                                    </div>
                                    <p class="text-sm text-gray-600 m-0">
                                        Complete the schedule on the right with stated values for each unit.
                                    </p>
                                </div>
                             }
                        </div>
                    </div>
                </p-card>
            </div>

            <!-- Right Panel: Physical Damage Units -->
            <div class="col-12 lg:col-7 flex flex-column h-full">
                <p-card styleClass="h-full flex flex-column" [style]="{opacity: riskProfile().coverage.physicalDamage ? '1' : '0.6', pointerEvents: riskProfile().coverage.physicalDamage ? 'auto' : 'none'}">
                    <ng-template pTemplate="header">
                        <div class="p-3 border-bottom-1 surface-border bg-gray-50 flex justify-content-between align-items-center">
                            <h3 class="font-semibold text-base m-0">Physical Damage - Unit Schedule</h3>
                            @if (!riskProfile().coverage.physicalDamage) {
                                <span class="text-sm font-italic text-gray-500">Enable Physical Damage to edit</span>
                            }
                        </div>
                    </ng-template>

                    <div class="p-0 flex-1 flex flex-column overflow-hidden" style="min-height: 250px;">
                        @if (riskProfile().vehicles.length === 0) {
                             <div class="flex flex-column align-items-center justify-content-center h-full text-gray-500 p-5">
                                <i class="pi pi-truck text-4xl mb-3"></i>
                                <span class="font-semibold">No vehicles added</span>
                                <span class="text-sm">Go back to Vehicles step to add units.</span>
                            </div>
                        } @else {
                            <p-table 
                                [value]="riskProfile().vehicles" 
                                [scrollable]="true" 
                                scrollHeight="flex" 
                                styleClass="p-datatable-sm"
                                [rowHover]="true">
                                <ng-template pTemplate="header">
                                    <tr>
                                        <th style="width: 4rem">Cover</th>
                                        <th>Vehicle</th>
                                        <th>VIN</th>
                                        <th style="width: 12rem">Stated Value</th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-vehicle>
                                    <tr [class.surface-50]="!isCovered(vehicle)">
                                        <td class="text-center">
                                            <p-checkbox 
                                                [binary]="true" 
                                                [ngModel]="isCovered(vehicle)" 
                                                (onChange)="toggleCoverage(vehicle, $event.checked)">
                                            </p-checkbox>
                                        </td>
                                        <td>
                                            <div class="font-semibold">{{ vehicle.year }} {{ vehicle.make }}</div>
                                            <div class="text-sm text-gray-500">{{ vehicle.model }}</div>
                                        </td>
                                        <td><span class="font-mono text-sm">{{ vehicle.vin | slice:0:8 }}...</span></td>
                                        <td>
                                            <p-inputNumber 
                                                [(ngModel)]="vehicle.statedAmount" 
                                                mode="currency" 
                                                currency="USD" 
                                                locale="en-US"
                                                placeholder="$0.00"
                                                [disabled]="!isCovered(vehicle)"
                                                styleClass="w-full"
                                                inputStyleClass="text-right">
                                            </p-inputNumber>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        }
                    </div>
                </p-card>
            </div>
        </div>

        <div class="flex justify-content-between mt-3 pt-3 border-top-1 surface-border">
            <p-button label="Back" icon="pi pi-arrow-left" [outlined]="true" severity="secondary" (onClick)="prev.emit()"></p-button>
            <p-button label="Next: Validate Carriers" icon="pi pi-arrow-right" iconPos="right" (onClick)="next.emit()"></p-button>
        </div>
    </div>
    `,
    styles: [`
        :host { display: block; height: 100%; }
        .step-container { padding: 0.5rem; height: 100%; display: flex; flex-direction: column; }
        
        :host ::ng-deep .p-card { height: 100%; display: flex; flex-direction: column; }
        :host ::ng-deep .p-card-body { flex: 1; display: flex; flex-direction: column; padding: 0; overflow: hidden; }
        :host ::ng-deep .p-card-content { flex: 1; display: flex; flex-direction: column; padding: 0; overflow: hidden; }
    `]
})
export class CoverageStepComponent {
    constructor() {
        console.log('CoverageStepComponent initialized');
    }
    private kbService = inject(KnowledgeBaseService);
    riskProfile = model.required<RiskProfile>();
    prev = output<void>();
    next = output<void>();

    private readonly EMPTY_LIST: any[] = [];

    liabilityLimits = [
        { label: '$750,000', value: 750000 },
        { label: '$1,000,000', value: 1000000 },
        { label: '$2,000,000', value: 2000000 },
        { label: '$5,000,000', value: 5000000 }
    ];

    isCovered(vehicle: Vehicle): boolean {
        // Considered covered if statedAmount is explicitly defined (even 0, though usually >0)
        return vehicle.statedAmount !== undefined && vehicle.statedAmount !== null;
    }

    // Helper for Cargo Toggle UI
    hasCargo = computed(() => {
        return this.riskProfile().coverage.cargoLimit !== undefined && this.riskProfile().coverage.cargoLimit !== null;
    });

    // Computed options to prevent infinite change detection loops from method calls in template
    autoLiabilityOptions = computed(() => {
        const c = this.kbService.coverages().find((x: any) => x.id === 'AUTO_LIABILITY');
        return c ? c.subCoverages : this.EMPTY_LIST;
    });

    cargoOptions = computed(() => {
        const c = this.kbService.coverages().find((x: any) => x.id === 'MOTOR_TRUCK_CARGO');
        return c ? c.subCoverages : this.EMPTY_LIST;
    });

    physicalDamageOptions = computed(() => {
        const c = this.kbService.coverages().find((x: any) => x.id === 'PHYSICAL_DAMAGE');
        return c ? c.subCoverages : this.EMPTY_LIST;
    });

    // Helper to access or initialize the selected sub-coverages array for a category
    getSelectedSubCoverages(categoryId: string): string[] {
        // Safe access without mutation
        const profile = this.riskProfile();
        return profile.coverage?.selectedSubCoverages?.[categoryId] || this.EMPTY_LIST;
    }

    // Update the selected sub-coverages for a category
    onSubCoverageChange(categoryId: string, event: any) {
        const selectedIds = event.value; // p-multiSelect returns array of values (IDs)
        this.riskProfile.update(profile => {
            // Deep copy to ensure immutability and signal notification
            const updated = { ...profile, coverage: { ...profile.coverage } };

            if (!updated.coverage.selectedSubCoverages) {
                updated.coverage.selectedSubCoverages = {};
            } else {
                updated.coverage.selectedSubCoverages = { ...updated.coverage.selectedSubCoverages };
            }

            updated.coverage.selectedSubCoverages[categoryId] = selectedIds;
            return updated;
        });
    }

    toggleCargo(checked: boolean) {
        this.riskProfile.update(profile => {
            const updated = { ...profile };
            if (checked) {
                if (!updated.coverage.cargoLimit) updated.coverage.cargoLimit = 100000; // Default Limit
                if (!updated.coverage.cargoDeductible) updated.coverage.cargoDeductible = 1000; // Default Deductible
            } else {
                updated.coverage.cargoLimit = undefined;
                updated.coverage.cargoDeductible = undefined;
                // Also clear cargo sub-coverages
                if (updated.coverage.selectedSubCoverages) {
                    delete updated.coverage.selectedSubCoverages['MOTOR_TRUCK_CARGO'];
                }
            }
            return updated;
        });
    }

    toggleCoverage(vehicle: Vehicle, checked: boolean) {
        if (checked) {
            vehicle.statedAmount = 0; // Initialize
        } else {
            vehicle.statedAmount = undefined; // Clear
        }
    }

    onPhysicalDamageChange() {
        this.riskProfile.update(profile => {
            const updated = { ...profile };
            const pdEnabled = updated.coverage.physicalDamage;

            if (pdEnabled) {
                // Set default deductibles if not set
                if (!updated.coverage.physicalDamageDeductibles) {
                    updated.coverage.physicalDamageDeductibles = { comp: 1000, coll: 1000 };
                }
            } else {
                // If disabled, clear sub-coverages for Physical Damage
                if (updated.coverage.selectedSubCoverages) {
                    delete updated.coverage.selectedSubCoverages['PHYSICAL_DAMAGE'];
                }
                updated.coverage.physicalDamageDeductibles = undefined;
            }
            return updated;
        });
    }
}
