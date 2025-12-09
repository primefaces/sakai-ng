import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RiskProfile } from '../../core/models/risk-profile.model';

import { CarrierValidationStepComponent } from './carrier-validation-step.component';
import { CoverageStepComponent } from './coverage-step.component';
import { VehiclesStepComponent } from './vehicles-step.component';
import { BusinessInfoStepComponent } from './business-info-step.component';

import { DriversStepComponent } from './drivers-step.component';
import { OperationsStepComponent } from './operations-step.component';
import { LossHistoryStepComponent } from './loss-history-step.component';

@Component({
    selector: 'app-underwriting-workbench',
    standalone: true,
    imports: [
        CommonModule,
        StepperModule,
        ButtonModule,
        BusinessInfoStepComponent,
        DriversStepComponent,
        LossHistoryStepComponent,
        VehiclesStepComponent,
        OperationsStepComponent,
        CoverageStepComponent,
        CarrierValidationStepComponent
    ],
    providers: [MessageService],
    template: `
    <div class="workbench-container">
        <div class="workbench-header">
            <h1><i class="pi pi-file-edit"></i> Centro de Suscripción</h1>
            <p class="subtitle">Análisis de Riesgo y Validación de Aseguradoras</p>
        </div>

        <p-stepper [value]="1" styleClass="workbench-stepper" [linear]="true">
            <p-step-list>
                <p-step [value]="1">Información del Negocio</p-step>
                <p-step [value]="2">Conductores</p-step>
                <p-step [value]="3">Historial de Pérdidas</p-step>
                <p-step [value]="4">Vehículos</p-step>
                <p-step [value]="5">Operaciones</p-step>
                <p-step [value]="6">Coberturas</p-step>
                <p-step [value]="7">Validación</p-step>
            </p-step-list>
            
            <p-step-panels>
                <p-step-panel [value]="1">
                    <ng-template pTemplate="content" let-activateCallback="activateCallback">
                        <app-business-info-step
                            [(riskProfile)]="riskProfile"
                            (next)="activateCallback(2)">
                        </app-business-info-step>
                    </ng-template>
                </p-step-panel>

                <p-step-panel [value]="2">
                    <ng-template pTemplate="content" let-activateCallback="activateCallback">

                        <app-drivers-step
                            (prev)="activateCallback(1)"
                            (next)="activateCallback(3)">
                        </app-drivers-step>
                    </ng-template>
                </p-step-panel>

                <p-step-panel [value]="3">
                    <ng-template pTemplate="content" let-activateCallback="activateCallback">
                         <app-loss-history-step
                            [(riskProfile)]="riskProfile"
                            (prev)="activateCallback(2)"
                            (next)="activateCallback(4)">
                        </app-loss-history-step>
                    </ng-template>
                </p-step-panel>

                <p-step-panel [value]="4">
                    <ng-template pTemplate="content" let-activateCallback="activateCallback">
                        <app-vehicles-step
                            [(vehicles)]="riskProfile().vehicles"
                            (prev)="activateCallback(3)"
                            (next)="activateCallback(5)">
                        </app-vehicles-step>
                    </ng-template>
                </p-step-panel>

                <p-step-panel [value]="5">
                    <ng-template pTemplate="content" let-activateCallback="activateCallback">
                        <app-operations-step
                            [(riskProfile)]="riskProfile"
                            (prev)="activateCallback(4)"
                            (next)="activateCallback(6)">
                        </app-operations-step>
                    </ng-template>
                </p-step-panel>

                <p-step-panel [value]="6">
                    <ng-template pTemplate="content" let-activateCallback="activateCallback">
                        <app-coverage-step
                            [(riskProfile)]="riskProfile"
                            (prev)="activateCallback(5)"
                            (next)="activateCallback(7)">
                        </app-coverage-step>
                    </ng-template>
                </p-step-panel>

                <p-step-panel [value]="7">
                    <ng-template pTemplate="content" let-activateCallback="activateCallback">
                        <app-carrier-validation-step
                            [(riskProfile)]="riskProfile"
                            (prev)="activateCallback(6)"
                            (next)="generateSubmission()">
                        </app-carrier-validation-step>
                    </ng-template>
                </p-step-panel>
            </p-step-panels>
        </p-stepper>
    </div>
    `,
    styles: [`
        :host {
            display: block;
            height: auto;
            min-height: 100%;
        }

        .workbench-container {
            padding: 1rem;
            max-width: 100%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
        }

        .workbench-header {
            margin-bottom: 1rem;
            text-align: center;
            flex-shrink: 0;
        }

        .workbench-header h1 {
            color: var(--text-color);
            font-size: 1.75rem;
            margin: 0 0 0.25rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
        }

        .workbench-header h1 i {
            color: var(--primary-color);
        }

        .subtitle {
            color: var(--text-color-secondary);
            font-size: 1rem;
            margin: 0;
        }

        :host ::ng-deep .p-stepper {
            flex-direction: column;
            display: flex;
            height: 100%;
            overflow: hidden;
        }

        :host ::ng-deep .p-step-list {
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--surface-border);
            margin-bottom: 1rem;
            flex-shrink: 0;
        }

        :host ::ng-deep .p-step {
            font-weight: 600;
        }
        
        :host ::ng-deep .p-step-active {
            color: var(--primary-color) !important;
        }

        /* Essential for full height panels */
        :host ::ng-deep .p-step-panels {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        :host ::ng-deep .p-step-panel {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        :host ::ng-deep .p-card {
            height: 100%;
            display: flex;
            flex-direction: column;
            background-color: var(--surface-card);
            color: var(--text-color);
        }

        :host ::ng-deep .p-card-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            padding: 1.25rem;
        }

        :host ::ng-deep .p-card-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        :host ::ng-deep .step-actions {
            margin-top: auto;
            flex-shrink: 0;
        }

        @media (max-width: 768px) {
            .workbench-container {
                padding: 0.5rem;
            }
        }
    `]
})
export class UnderwritingWorkbenchComponent {
    private router = inject(Router);

    private messageService = inject(MessageService);

    riskProfile = signal<RiskProfile>({
        status: 'draft',
        businessInfo: {
            entityType: 'LLC',
            businessName: '',
            yearsInBusiness: 0,
            operatingRadius: 0,
            garagingAddress: { city: '', state: '', zip: '' },
            mailingAddress: { city: '', state: '', zip: '' }
        },
        drivers: [],
        vehicles: [],
        lossHistory: [],
        operations: {
            cargoCommodities: [],
            filingsRequired: []
        },
        coverage: {
            liabilityLimit: 1000000
        }
    });

    generateSubmission() {
        console.log('Generating Submission Draft...', this.riskProfile());

        // Construct mailto link
        const profile = this.riskProfile();
        const subject = `Submission Request: ${profile.businessInfo.businessName} - ${profile.businessInfo.dotNumber || 'New Venture'}`;
        const body = `
PLEASE QUOTE:

Business: ${profile.businessInfo.businessName} (DOT: ${profile.businessInfo.dotNumber || 'N/A'})
Address: ${profile.businessInfo.garagingAddress.city}, ${profile.businessInfo.garagingAddress.state}

Drivers: ${profile.drivers.length}
Vehicles: ${profile.vehicles.length}
Commodities: ${profile.operations.cargoCommodities.join(', ')}

Coverages Requested:
- Liability: $${(profile.coverage.liabilityLimit || 0).toLocaleString()}
- Cargo: ${profile.coverage.cargoLimit ? '$' + profile.coverage.cargoLimit.toLocaleString() : 'Declined'}
- Physical Damage: ${profile.coverage.physicalDamage ? 'Yes (See Schedule)' : 'Declined'}

Validated Markets:
${(profile.validationResults || []).filter(r => r.status === 'eligible').map(r => '- ' + r.carrierName).join('\n')}
        `.trim();

        const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailto, '_blank');

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Email draft generated' });
    }

    handleSubmit(): void {
        this.generateSubmission();
    }
}
