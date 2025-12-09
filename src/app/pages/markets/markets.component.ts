import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { MarketService } from '../../core/services/market.service';
import { MGA } from '../../core/models/carrier.model';

@Component({
    selector: 'app-markets',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        InputNumberModule,
        SelectModule,
        CheckboxModule,
        ButtonModule,
        BadgeModule,
        DividerModule,
        DialogModule,
        TagModule,
        ChipModule,
        TableModule,
        TooltipModule,
        SkeletonModule
    ],
    animations: [
        trigger('rowExpansionTrigger', [
            state('void', style({
                transform: 'translateX(-10%)',
                opacity: 0
            })),
            state('active', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ],
    template: `
    <div class="markets-container flex flex-column h-screen overflow-hidden surface-ground transition-colors animation-duration-500">
      <!-- HEADER -->
      <div class="header-section mb-3 flex justify-content-between align-items-center px-4 pt-3 flex-none">
        <div>
            <h1 class="text-3xl font-bold m-0 tracking-tight text-color uppercase flex align-items-center gap-2">
                Buscador de Mercados 
                <span class="text-primary text-xs px-2 py-1 surface-card border-round border-1 surface-border font-mono">TERMINAL v2.1</span>
            </h1>
            <p class="text-color-secondary m-0 text-sm font-mono mt-1 opacity-70">Inteligencia de Suscripción en Tiempo Real</p>
        </div>
        <div class="flex gap-2 align-items-center">
             <i class="pi pi-server text-color-secondary"></i>
            <p-tag severity="info" [value]="'MGAs INDEXADOS: ' + (markets().length)" styleClass="font-mono text-xs"></p-tag>
        </div>
      </div>
      
      <div class="markets-layout grid m-0 h-full overflow-hidden pb-4 px-4">
        <!-- Filter Sidebar -->
        <div class="col-fixed p-0 pr-3 h-full overflow-y-auto" style="width: 280px">
          <div class="terminal-card shadow-4 h-full flex flex-column surface-card border-1 surface-border">
            <div class="terminal-header border-bottom-1 surface-border p-3 surface-ground font-bold text-color-secondary text-xs tracking-widest">
                <i class="pi pi-filter mr-2"></i>MATRIZ DE FILTROS
            </div>
            <div class="p-3 flex-grow-1 flex flex-column gap-4">
                <!-- 1. Cargo Type -->
                <div class="filter-group">
                  <label class="block text-xs font-bold text-color-secondary mb-2 tracking-wide">TIPO DE CARGA <span class="text-primary">*</span></label>
                  <p-select 
                    [ngModel]="filterCriteria().cargoType" 
                    (ngModelChange)="handleFilterChange('cargoType', $event)" 
                    [options]="cargoTypes()" 
                    optionLabel="label" 
                    optionValue="value" 
                    placeholder="SELECCIONAR CARGA" 
                    [filter]="true" 
                    styleClass="w-full text-sm"
                    [showClear]="true">
                  </p-select>
                </div>
    
                <!-- 2. Tenure -->
                <div class="filter-group">
                  <label class="block text-xs font-bold text-color-secondary mb-2 tracking-wide">AÑOS EN EL NEGOCIO</label>
                     <p-inputnumber 
                        [ngModel]="filterCriteria().yearsInBusiness" 
                        (ngModelChange)="handleFilterChange('yearsInBusiness', $event)" 
                        [min]="0" [max]="100" 
                        [showButtons]="true" 
                        placeholder="0" 
                        styleClass="w-full"
                        inputStyleClass="w-full">
                    </p-inputnumber>
                </div>

                <!-- 3. Driver Age -->
                <div class="filter-group">
                  <label class="block text-xs font-bold text-color-secondary mb-2 tracking-wide">EDAD DEL CONDUCTOR</label>
                   <p-inputnumber 
                        [ngModel]="filterCriteria().driverAge" 
                        (ngModelChange)="handleFilterChange('driverAge', $event)" 
                        placeholder="Age" 
                        [min]="18" [max]="99"
                        styleClass="w-full"
                        inputStyleClass="w-full">
                    </p-inputnumber>
                </div>

                <!-- 4. Flags -->
                <div class="filter-group surface-ground p-3 border-round border-1 surface-border">
                    <p-checkbox 
                        [ngModel]="filterCriteria().hasDashCam" 
                        (ngModelChange)="handleFilterChange('hasDashCam', $event)" 
                        [binary]="true" 
                        label="TIENE DASH CAM"
                        styleClass="terminal-checkbox text-sm">
                    </p-checkbox>
                </div>
            </div>
            
            <div class="p-3 border-top-1 surface-border">
                 <button pButton label="RESTABLECER CRITERIOS" icon="pi pi-refresh" class="p-button-outlined p-button-sm w-full p-button-danger text-xs font-bold" (click)="clearFilters()"></button>
            </div>
          </div>
        </div>

        <!-- Main Content: Data Grid -->
        <div class="col p-0 h-full overflow-y-auto custom-scrollbar">
             
             <!-- LOADING STATE -->
             <div *ngIf="loading" class="flex flex-column gap-3 p-4">
                <div class="flex gap-3">
                    <p-skeleton width="100%" height="4rem" styleClass="surface-card"></p-skeleton>
                </div>
                <p-skeleton width="100%" height="150px" styleClass="surface-card"></p-skeleton>
                <p-skeleton width="100%" height="150px" styleClass="surface-card"></p-skeleton>
             </div>

             <div *ngIf="!loading">
                 <!-- Recommended Section -->
                 <div *ngIf="recommendations().recommended.length > 0" class="mb-5 fadein animation-duration-300">
                    <div class="flex align-items-center gap-2 mb-2">
                         <div class="h-2rem w-3px bg-primary border-round"></div>
                     <div class="text-primary font-bold tracking-widest text-sm">RECOMENDACIONES ESTRATÉGICAS</div>
                    </div>
                    
                    <p-table [value]="recommendations().recommended" dataKey="id" size="small" styleClass="p-datatable-sm p-datatable-gridlines shadow-2 border-round overflow-hidden surface-card" [expandedRowKeys]="expandedRows">
                        <ng-template pTemplate="header">
                            <tr class="surface-ground text-color-secondary text-xs">
                                <th style="width: 3rem"></th>
                                <th style="width: 25%">MGA / PROGRAM</th>
                                <th class="text-center">RATING</th>
                                <th class="text-center">RETENTION</th>
                                <th>COVERAGES</th>
                                <th>NOTES</th>
                                <th style="width: 4rem"></th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-mga let-expanded="expanded">
                            <tr class="recommended-row surface-card border-bottom-1 surface-border">
                                <td>
                                    <button type="button" pButton pRipple [pRowToggler]="mga" class="p-button-text p-button-rounded p-button-secondary p-button-sm h-2rem w-2rem" [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'" pTooltip="Ver Carriers"></button>
                                </td>
                                <td>
                                    <div class="font-bold text-base text-color flex align-items-center gap-2">
                                        {{ mga?.name }}
                                        <i *ngIf="mga?.recommendationTag" class="pi pi-star-fill text-primary text-xs" pTooltip="Opción Principal"></i>
                                    </div>
                                    <span class="text-xs text-primary font-mono" *ngIf="mga?.recommendationTag">{{ mga.recommendationTag }}</span>
                                </td>
                                <td class="text-center"><p-tag [value]="mga?.rating || 'NR'" [severity]="getRatingSeverity(mga?.rating)" styleClass="text-xs font-mono"></p-tag></td>
                                <td class="text-center">
                                    <span [class.text-red-500]="mga?.riskLevel === 'HIGH_RISK'" [class.font-bold]="mga?.riskLevel === 'HIGH_RISK'" class="text-sm text-color-secondary">
                                        {{ mga?.retention || 'None' }}
                                    </span>
                                    <i *ngIf="mga?.riskLevel === 'HIGH_RISK'" class="pi pi-exclamation-triangle text-red-500 ml-1 text-xs" pTooltip="Risk Retention Group (RRG)"></i>
                                </td>
                                <td>
                                    <div class="flex gap-1 flex-wrap">
                                        <span class="cov-badge" [class.active]="mga?.coverages?.al">AL</span>
                                        <span class="cov-badge" [class.active]="mga?.coverages?.pd">PD</span>
                                        <span class="cov-badge" [class.active]="mga?.coverages?.mtc">MTC</span>
                                        <span class="cov-badge" [class.active]="mga?.coverages?.gl">GL</span>
                                    </div>
                                </td>
                                 <td class="text-xs text-color-secondary max-w-20rem white-space-nowrap overflow-hidden text-overflow-ellipsis" [pTooltip]="mga?.recommendationNotes">
                                    {{ mga?.recommendationNotes }}
                                </td>
                                <td>
                                    <button pButton icon="pi pi-book" class="p-button-text p-button-sm text-color-secondary hover:text-primary z-5 relative" (click)="openGuidelines(mga); $event.stopPropagation()" pTooltip="Ver Guías"></button>
                                </td>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="rowexpansion" let-mga>
                            <tr>
                                <td colspan="7" class="p-0">
                                    <div class="p-3 surface-ground border-left-3 border-primary shadow-inner">
                                        <div class="font-bold text-xs mb-2 text-color-secondary tracking-wider">CARRIERS DISPONIBLES</div>
                                        <p-table [value]="mga?.carriers" size="small" styleClass="p-datatable-sm bg-transparent w-full">
                                            <ng-template pTemplate="header">
                                                <tr>
                                                    <th class="text-xs bg-transparent pl-0 text-color-secondary">CARRIER NAME</th>
                                                    <th class="text-xs bg-transparent text-color-secondary">RATING</th>
                                                    <th class="text-xs bg-transparent text-color-secondary">TYPE</th>
                                                </tr>
                                            </ng-template>
                                            <ng-template pTemplate="body" let-carrier>
                                                <tr>
                                                    <td class="pl-0 text-sm font-semibold text-color">{{ carrier?.name }}</td>
                                                    <td><p-tag [value]="carrier?.rating" [severity]="getRatingSeverity(carrier?.rating)" styleClass="text-xs"></p-tag></td>
                                                    <td class="text-color-secondary text-sm">{{ carrier?.type }}</td>
                                                </tr>
                                            </ng-template>
                                        </p-table>
                                    </div>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                 </div>
    
                 <!-- Open Market -->
                 <div class="flex align-items-center gap-2 mb-2 mt-4">
                     <div class="h-2rem w-3px surface-400 border-round"></div>
                     <div class="text-color-secondary font-bold tracking-widest text-sm">DIRECTORIO DE MERCADO ABIERTO</div>
                </div>

                 <p-table *ngIf="recommendations().others.length > 0" [value]="recommendations().others" dataKey="id" size="small" styleClass="p-datatable-sm p-datatable-striped opacity-90 surface-card" [rowHover]="true" [paginator]="true" [rows]="15" [expandedRowKeys]="expandedRows">
                    <ng-template pTemplate="header">
                        <tr class="text-xs surface-ground text-color-secondary">
                            <th style="width: 3rem"></th>
                            <th style="width: 30%">MGA</th>
                            <th>TIER</th>
                            <th>RATING</th>
                            <th>RETENTION</th>
                            <th>COVERAGES</th>
                            <th>ACTIONS</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-mga let-expanded="expanded">
                        <tr class="text-sm">
                            <td>
                                <button type="button" pButton pRipple [pRowToggler]="mga" class="p-button-text p-button-rounded p-button-secondary p-button-sm h-2rem w-2rem" [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'" pTooltip="Ver Carriers"></button>
                            </td>
                            <td class="font-bold text-color">{{ mga?.name }}</td>
                            <td><span class="text-xs font-mono px-2 py-1 surface-ground border-round">{{ mga?.tier }}</span></td>
                            <td><span class="font-mono text-xs">{{ mga?.rating || '-' }}</span></td>
                             <td>
                                <span [class.text-red-500]="mga?.riskLevel === 'HIGH_RISK'">{{ mga?.retention || 'None' }}</span>
                            </td>
                            <td>
                                 <div class="flex gap-1">
                                    <span class="cov-badge" [class.active]="mga?.coverages?.al">AL</span>
                                    <span class="cov-badge" [class.active]="mga?.coverages?.pd">PD</span>
                                    <span class="cov-badge" [class.active]="mga?.coverages?.mtc">MTC</span>
                                </div>
                            </td>
                            <td>
                                 <button pButton icon="pi pi-external-link" class="p-button-text p-button-sm text-primary z-5 relative" (click)="openGuidelines(mga); $event.stopPropagation()"></button>
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="rowexpansion" let-mga>
                         <tr>
                            <td colspan="7" class="p-0">
                                <div class="p-3 surface-ground border-top-1 surface-border">
                                    <h6 class="m-0 mb-2 text-color-secondary text-xs">CARRIERS</h6>
                                    <ul class="list-none p-0 m-0 grid">
                                        <li *ngFor="let c of mga?.carriers" class="col-12 md:col-6 text-sm text-color-secondary">
                                            <i class="pi pi-shield mr-2 text-color"></i> {{ c.name }} <span class="text-primary font-mono">({{c.rating}})</span>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </ng-template>
                 </p-table>
    
                 <!-- Empty State -->
                 <div *ngIf="recommendations().recommended.length === 0 && recommendations().others.length === 0" class="flex flex-column align-items-center justify-content-center p-6 border-1 border-dashed surface-border border-round surface-card mt-4 h-20rem">
                    <div class="p-3 border-round-circle surface-ground mb-3">
                        <i class="pi pi-search text-color-secondary text-3xl"></i>
                    </div>
                    <div class="text-xl font-bold text-color text-center uppercase tracking-wide">Listo para Buscar</div>
                    <p class="text-sm text-color-secondary text-center max-w-20rem mt-2">Selecciona un <strong>Tipo de Carga</strong> de la matriz para inicializar el motor de suscripción.</p>
                 </div>
             </div>
        </div>

      </div>

      <!-- Guidelines Right Sidebar -->
      <p-dialog [(visible)]="displayGuidelines" position="right" [modal]="true" styleClass="guidelines-sidebar" [style]="{width: '500px', height: '100%', margin: '0', maxHeight: '100%'}" [draggable]="false" [resizable]="false" [showHeader]="false" [contentStyle]="{'padding': '0', 'height': '100%'}">
          <div *ngIf="selectedMGA" class="flex flex-column h-full surface-card">
               <!-- Custom Header -->
               <div class="p-4 border-bottom-1 surface-border flex justify-content-between align-items-center surface-ground">
                   <div class="flex align-items-center gap-3">
                       <button pButton icon="pi pi-times" class="p-button-text p-button-sm text-color-secondary hover:text-color" (click)="displayGuidelines = false"></button>
                       <div class="font-bold text-xl text-color spacing-wide">{{ selectedMGA.name }}</div>
                   </div>
                   <p-tag [value]="selectedMGA.tier" severity="secondary"></p-tag>
               </div>
               
               <div class="flex-1 overflow-y-auto p-4 flex flex-column gap-4">
                   
                   <!-- Risk Alert -->
                   <div *ngIf="selectedMGA.riskLevel === 'HIGH_RISK'" class="p-3 bg-red-50 border-left-3 border-red-500 text-red-700 text-sm">
                       <i class="pi pi-exclamation-triangle mr-2"></i>
                       <strong>Risk Retention Group (RRG)</strong> o Alto Retention. Asegurar verificaciones estrictas de solvencia.
                   </div>

                    <!-- Coverage Types (Insurance Products) -->
                    <div>
                        <div class="text-xs font-bold text-color-secondary uppercase mb-3 tracking-widest">Tipos de Cobertura</div>
                        <div class="flex flex-wrap gap-2">
                             <span *ngIf="selectedMGA.appetite?.autoLiability" class="px-2 py-1 border-round surface-ground text-color border-1 surface-border text-xs"><i class="pi pi-check text-green-500 mr-1 text-xs"></i>Auto Liability (AL)</span>
                             <span *ngIf="selectedMGA.appetite?.physicalDamage" class="px-2 py-1 border-round surface-ground text-color border-1 surface-border text-xs"><i class="pi pi-check text-green-500 mr-1 text-xs"></i>Physical Damage (PD)</span>
                             <span *ngIf="selectedMGA.appetite?.cargo" class="px-2 py-1 border-round surface-ground text-color border-1 surface-border text-xs"><i class="pi pi-check text-green-500 mr-1 text-xs"></i>Motor Truck Cargo (MTC)</span>
                             <span *ngIf="selectedMGA.appetite?.generalLiability" class="px-2 py-1 border-round surface-ground text-color border-1 surface-border text-xs"><i class="pi pi-check text-green-500 mr-1 text-xs"></i>General Liability (GL)</span>
                             <span *ngIf="selectedMGA.appetite?.trailerInterchange" class="px-2 py-1 border-round surface-ground text-color border-1 surface-border text-xs"><i class="pi pi-check text-green-500 mr-1 text-xs"></i>Trailer Interchange</span>
                        </div>
                    </div>

                    <!-- Business Types (Mode of Transport) -->
                    <div>
                        <div class="text-xs font-bold text-color-secondary uppercase mb-3 tracking-widest">Tipos de Negocio / Operación</div>
                        <div class="flex flex-wrap gap-2">
                             <span *ngIf="selectedMGA.appetite?.flatbed" class="px-2 py-1 border-round surface-ground text-color border-1 surface-border text-xs">Flatbed</span>
                             <span *ngIf="selectedMGA.appetite?.dryVan" class="px-2 py-1 border-round surface-ground text-color border-1 surface-border text-xs">Dry Van</span>
                             <span *ngIf="selectedMGA.appetite?.reefer" class="px-2 py-1 border-round surface-ground text-color border-1 surface-border text-xs">Reefer (Refrigerado)</span>
                        </div>
                    </div>

                    <!-- Cargo Types (Specific Materials) -->
                    <div>
                        <div class="text-xs font-bold text-color-secondary uppercase mb-3 tracking-widest">Tipos de Carga Especializada</div>
                        <div class="flex flex-wrap gap-2">
                             <span *ngIf="selectedMGA.appetite?.sandGravel" class="px-2 py-1 border-round surface-ground text-color border-1 surface-border text-xs">Sand & Gravel / Dump</span>
                             <span *ngIf="selectedMGA.appetite?.autoHauler" class="px-2 py-1 border-round surface-ground text-color border-1 surface-border text-xs">Auto Hauler</span>
                             <span *ngIf="selectedMGA.appetite?.intermodal" class="px-2 py-1 border-round surface-ground text-color border-1 surface-border text-xs">Intermodal</span>
                        </div>
                    </div>

                   <!-- Requirements -->
                   <div class="surface-ground border-1 surface-border border-round p-4">
                       <div class="text-xs font-bold text-color-secondary uppercase mb-3 tracking-widest">Requisitos</div>
                       <div class="grid text-sm">
                           <div class="col-6">
                               <div class="text-color-secondary mb-1 text-xs">EDAD MÍNIMA</div>
                               <div class="font-bold text-color text-lg font-mono">{{ selectedMGA.requirements.minDriverAge }}+</div>
                           </div>
                           <div class="col-6">
                               <div class="text-color-secondary mb-1 text-xs">CDL MÍNIMA</div>
                               <div class="font-bold text-color text-lg font-mono">{{ selectedMGA.requirements.minCdlExperience }} <span class="text-xs text-color-secondary font-sans">Años</span></div>
                           </div>
                           <div class="col-12 mt-3 pt-3 border-top-1 surface-border" *ngIf="selectedMGA.requirements.notes">
                               <div class="text-color-secondary mb-1 text-xs">NOTES</div>
                               <div class="font-medium line-height-3 text-color">{{ selectedMGA.requirements.notes }}</div>
                           </div>
                       </div>
                   </div>

                   <!-- Carriers Table -->
                   <div>
                       <div class="text-xs font-bold text-color-secondary uppercase mb-3 tracking-widest">Carriers de Suscripción</div>
                       <p-table [value]="selectedMGA.carriers" size="small" styleClass="p-datatable-sm p-datatable-gridlines text-sm" [rowHover]="true">
                           <ng-template pTemplate="header">
                               <tr>
                                   <th class="surface-ground text-color-secondary border-none">Nombre</th>
                                   <th class="surface-ground text-color-secondary border-none" style="width: 80px">Rating</th>
                                   <th class="surface-ground text-color-secondary border-none" style="width: 100px">Tipo</th>
                               </tr>
                           </ng-template>
                           <ng-template pTemplate="body" let-c>
                               <tr>
                                   <td class="surface-card text-color border-bottom-1 surface-border font-medium">{{ c.name }}</td>
                                   <td class="surface-card border-bottom-1 surface-border"><p-tag [value]="c.rating" [severity]="getRatingSeverity(c.rating)" styleClass="font-mono text-xs"></p-tag></td>
                                   <td class="surface-card text-color-secondary border-bottom-1 surface-border">{{ c.type }}</td>
                               </tr>
                           </ng-template>
                       </p-table>
                   </div>
                   
                   <!-- Audit Questions -->
                   <div *ngIf="selectedMGA.auditQuestions?.length" class="mt-2">
                       <div class="text-xs font-bold text-red-500 uppercase mb-2 tracking-widest">Reglas Eliminatorias</div>
                       <ul class="list-none p-0 m-0 flex flex-column gap-2">
                           <li *ngFor="let q of selectedMGA.auditQuestions" class="p-3 border-1 border-red-200 bg-red-50 border-round text-sm text-red-700 flex align-items-start gap-2">
                               <i class="pi pi-ban mt-1 text-red-500"></i>
                               <span>{{ q.question }} <span class="block text-xs mt-1 text-red-500 opacity-80">(Falla: {{ q.failureMessage }})</span></span>
                           </li>
                       </ul>
                   </div>

               </div>
          </div>
      </p-dialog>
    </div>
  `,
    styles: [`
    :host {
        display: block;
        background-color: var(--p-surface-ground);
        min-height: 100vh;
        color: var(--p-text-color);
        font-family: 'Inter', sans-serif;
    }
    
    .markets-container {
        padding: 1.5rem;
    }

    .markets-layout {
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 1.5rem;
    }

    /* Styles use semantic vars now, minimizing custom CSS */
    .terminal-card {
        border-radius: 12px;
    }
    
    /* Recommended Highlight */
    .recommended-row {
       /* Handled by surface classes */
    }

    /* Badges */
    .cov-badge {
        font-size: 0.65rem;
        padding: 2px 6px;
        border-radius: 4px;
        background: var(--p-surface-ground);
        color: var(--p-text-color-secondary);
        font-weight: 700;
        border: 1px solid var(--p-surface-border);
    }
    .cov-badge.active {
        background: var(--p-primary-color);
        color: #ffffff;
        border-color: var(--p-primary-color);
    }
  `]
})
export class MarketsComponent {
    private marketService = inject(MarketService);

    filterCriteria = this.marketService.filterCriteria;
    recommendations = this.marketService.recommendations;
    markets = this.marketService.markets;

    cargoTypes = this.marketService.getCargoTypes();
    vehicleTypes = this.marketService.getVehicleTypes();

    loading = false; // Simple flag for loading state

    expandedRows = {};
    displayGuidelines = false;
    selectedMGA: MGA | null = null;

    async handleFilterChange(key: any, value: any) {
        this.loading = true;
        // Simulate network delay for "System Processing" feel
        await new Promise(resolve => setTimeout(resolve, 600));
        this.marketService.updateFilter(key, value);
        this.loading = false;
    }

    clearFilters() {
        this.loading = true;
        setTimeout(() => {
            this.marketService.clearFilters();
            this.loading = false;
        }, 300);
    }

    openGuidelines(mga: MGA) {
        this.selectedMGA = mga;
        this.displayGuidelines = true;
    }

    getRatingSeverity(rating: string | undefined): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
        if (!rating) return 'secondary';
        if (rating.startsWith('A')) return 'success';
        if (rating.startsWith('B')) return 'warn';
        return 'secondary';
    }
}
