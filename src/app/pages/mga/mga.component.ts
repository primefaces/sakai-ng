import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { MarketService } from '../../core/services/market.service';
import { MGA } from '../../core/models/carrier.model';

@Component({
    selector: 'app-mga',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        CardModule,
        DrawerModule,
        TableModule,
        DividerModule,
        TagModule,
        ChipModule,
        BadgeModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        TooltipModule
    ],
    template: `
    <div class="mga-page fadein animation-duration-500">
      <div class="header flex flex-column sm:flex-row justify-content-between align-items-center mb-4 gap-3">
        <div>
            <h1 class="text-3xl font-bold mb-1 text-color tracking-tight">Directorio de Mercados</h1>
            <p class="text-color-secondary m-0 font-light">Guías Consolidadas de MGAs y Carriers</p>
        </div>
        <div class="search-box">
             <span class="p-input-icon-left w-full">
                <i class="pi pi-search text-color-secondary"></i>
                <input type="text" pInputText placeholder="Buscar mercados..." (input)="filter($event)" class="w-full sm:w-20rem" />
            </span>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="grid" *ngIf="filteredMgas().length > 0; else noResults">
          <div class="col-12 md:col-6 lg:col-4" *ngFor="let mga of filteredMgas()">
              <p-card styleClass="mga-card surface-card shadow-2 border-1 surface-border h-full hover:shadow-4 transition-all transition-duration-300">
                  <!-- Header -->
                  <ng-template pTemplate="header">
                      <div class="flex justify-content-between align-items-start p-3 pb-0">
                          <div class="flex-1">
                              <h3 class="text-xl font-bold text-color m-0 mb-2">{{ mga.name }}</h3>
                              <div class="text-xs text-color-secondary">{{ mga.type }}</div>
                          </div>
                          <div class="flex flex-column gap-1 align-items-end">
                              <p-tag [value]="mga.tier" [severity]="getTierSeverity(mga.tier)" styleClass="text-xs"></p-tag>
                              <p-tag *ngIf="mga.riskLevel === 'HIGH_RISK'" value="RRG" severity="danger" icon="pi pi-exclamation-triangle" styleClass="text-xs"></p-tag>
                          </div>
                      </div>
                  </ng-template>

                  <!-- Content -->
                  <div class="flex flex-column gap-3">
                      <!-- Coverages -->
                      <div>
                          <div class="text-xs font-semibold text-color-secondary mb-2">COBERTURAS</div>
                          <div class="flex gap-1 flex-wrap">
                              <span class="text-xs px-2 py-1 border-round bg-primary-50 text-primary-900" *ngIf="mga.coverages?.al">AL</span>
                              <span class="text-xs px-2 py-1 border-round bg-primary-50 text-primary-900" *ngIf="mga.coverages?.pd">PD</span>
                              <span class="text-xs px-2 py-1 border-round bg-primary-50 text-primary-900" *ngIf="mga.coverages?.mtc">MTC</span>
                              <span class="text-xs px-2 py-1 border-round bg-primary-50 text-primary-900" *ngIf="mga.coverages?.gl">GL</span>
                          </div>
                      </div>

                      <!-- Retention -->
                      <div>
                          <div class="text-xs font-semibold text-color-secondary mb-1">RETENTION</div>
                          <div class="flex align-items-center gap-1">
                              <span class="text-sm" [class.text-red-500]="mga.riskLevel === 'HIGH_RISK'" [class.font-bold]="mga.riskLevel === 'HIGH_RISK'" [class.text-color-secondary]="mga.riskLevel !== 'HIGH_RISK'">
                                  {{ mga.retention || 'None' }}
                              </span>
                              <i *ngIf="mga.riskLevel === 'HIGH_RISK'" class="pi pi-exclamation-triangle text-red-500 text-xs" pTooltip="Risk Retention Group (RRG)"></i>
                          </div>
                      </div>

                      <!-- Email -->
                      <div>
                          <div class="text-xs font-semibold text-color-secondary mb-1">EMAIL DE SUMISIÓN</div>
                          <div class="text-xs text-color-secondary" *ngIf="mga.submissionEmail">
                              <i class="pi pi-envelope mr-1"></i>{{ mga.submissionEmail }}
                          </div>
                          <div class="text-xs text-color-secondary italic" *ngIf="!mga.submissionEmail">
                              No disponible
                          </div>
                      </div>

                      <!-- Carriers List -->
                      <div>
                          <div class="text-xs font-semibold text-color-secondary mb-2">CARRIERS ({{ mga.carriers.length || 0 }})</div>
                          <div *ngIf="mga.carriers && mga.carriers.length > 0; else noCarriers" class="flex flex-column gap-1">
                              <div *ngFor="let carrier of mga.carriers" class="flex align-items-center justify-content-between text-xs p-2 surface-ground border-round">
                                  <span class="font-medium text-color">{{ carrier.name }}</span>
                                  <p-tag [value]="carrier.rating" [severity]="getRatingSeverity(carrier.rating)" styleClass="text-xs font-mono"></p-tag>
                              </div>
                          </div>
                          <ng-template #noCarriers>
                              <div class="text-xs text-color-secondary italic">Sin carriers listados</div>
                          </ng-template>
                      </div>
                  </div>

                  <!-- Footer Actions -->
                  <ng-template pTemplate="footer">
                      <div class="flex gap-2">
                          <button pButton label="Ver Guías" icon="pi pi-list" class="p-button-outlined p-button-sm flex-1" (click)="openDetails(mga)"></button>
                          <button pButton icon="pi pi-external-link" class="p-button-outlined p-button-sm" (click)="navigateToMga(mga)" pTooltip="Ir a Página"></button>
                      </div>
                  </ng-template>
              </p-card>
          </div>
      </div>

      <!-- No Results -->
      <ng-template #noResults>
          <div class="text-center p-5 surface-card border-round border-1 surface-border">
              <i class="pi pi-search text-500 text-4xl mb-3"></i>
              <div class="text-xl font-bold text-color mb-2">No se Encontraron Mercados</div>
              <p class="text-color-secondary m-0">Intenta ajustar tus términos de búsqueda.</p>
          </div>
      </ng-template>

      <!-- Guidelines Drawer (kept same as before) -->
      <p-drawer [(visible)]="sidebarVisible" position="right" [style]="{width: '500px'}" styleClass="surface-card border-left-1 surface-border">
          <ng-template pTemplate="header">
               <div class="font-bold text-xl text-color">{{ selectedMga?.name }}</div>
          </ng-template>
          
          <div *ngIf="selectedMga" class="flex flex-column h-full">
               <div class="px-4 pb-3 flex align-items-center gap-2 border-bottom-1 surface-border">
                   <p-tag [value]="selectedMga.tier" [severity]="getTierSeverity(selectedMga.tier)"></p-tag>
                   <span *ngIf="selectedMga.riskLevel === 'HIGH_RISK'" class="text-red-500 font-bold text-sm"><i class="pi pi-exclamation-triangle mr-1"></i>Alto Riesgo / RRG</span>
               </div>
               
               <div class="flex-1 overflow-y-auto p-4 flex flex-column gap-4">
                   <div class="surface-ground border-round p-3 border-1 surface-border">
                       <div class="text-xs font-bold text-color-secondary uppercase mb-3">Requisitos</div>
                       <div class="grid text-sm m-0">
                           <div class="col-6 pl-0">
                               <div class="text-color-secondary mb-1 text-xs">EDAD MÍNIMA</div>
                               <div class="font-bold text-color text-lg">{{ selectedMga.requirements.minDriverAge }}+</div>
                           </div>
                           <div class="col-6 pl-0">
                               <div class="text-color-secondary mb-1 text-xs">EXPERIENCIA CDL</div>
                               <div class="font-bold text-color text-lg">{{ selectedMga.requirements.minCdlExperience }} Años</div>
                           </div>
                           <div class="col-12 pl-0 pt-2" *ngIf="selectedMga.requirements.notes">
                               <div class="text-color-secondary mb-1 text-xs">NOTES</div>
                               <div class="line-height-3 text-color text-sm">{{ selectedMga.requirements.notes }}</div>
                           </div>
                       </div>
                   </div>

                   <div>
                       <div class="text-xs font-bold text-color-secondary uppercase mb-2">Carriers de Suscripción</div>
                       <div *ngIf="selectedMga.carriers && selectedMga.carriers.length > 0; else noCarriersDrawer">
                           <p-table [value]="selectedMga.carriers" size="small" styleClass="p-datatable-sm p-datatable-gridlines text-sm" [rowHover]="true">
                               <ng-template pTemplate="header">
                                   <tr>
                                       <th class="surface-ground text-color-secondary">Nombre</th>
                                       <th class="surface-ground text-color-secondary" style="width: 80px">Rating</th>
                                       <th class="surface-ground text-color-secondary" style="width: 100px">Tipo</th>
                                   </tr>
                               </ng-template>
                               <ng-template pTemplate="body" let-c>
                                   <tr>
                                       <td class="font-medium text-color">{{ c.name }}</td>
                                       <td><p-tag [value]="c.rating" [severity]="getRatingSeverity(c.rating)" styleClass="font-mono text-xs"></p-tag></td>
                                       <td class="text-color-secondary">{{ c.type }}</td>
                                   </tr>
                               </ng-template>
                           </p-table>
                       </div>
                       <ng-template #noCarriersDrawer>
                           <div class="p-4 border-1 border-dashed surface-border border-round text-center">
                               <div class="text-color-secondary text-sm">No hay carriers listados para este MGA.</div>
                           </div>
                       </ng-template>
                   </div>
                   
                   <div *ngIf="selectedMga.auditQuestions?.length">
                       <div class="text-xs font-bold text-red-500 uppercase mb-2">Reglas Eliminatorias</div>
                       <ul class="list-none p-0 m-0 flex flex-column gap-2">
                           <li *ngFor="let q of selectedMga.auditQuestions" class="p-3 border-1 border-red-200 bg-red-50 border-round text-sm text-red-700 flex align-items-start gap-2">
                               <i class="pi pi-ban mt-1 text-red-600"></i>
                               <span>{{ q.question }} <span class="block text-xs mt-1 font-bold text-red-800">Debe Cumplir</span></span>
                           </li>
                       </ul>
                   </div>
               </div>
          </div>
      </p-drawer>
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
    .mga-page {
        max-width: 1600px;
        margin: 0 auto;
        padding: 2rem;
    }
    /* Semantic Drawer Overrides if needed, but classes should handle it */
    :host ::ng-deep .p-drawer {
        background: var(--p-surface-card) !important;
        border-left: 1px solid var(--p-content-border-color);
    }
    :host ::ng-deep .p-drawer-content {
        background: var(--p-surface-card) !important;
        padding: 0;
    }
    `]
})
export class MgaComponent {
    private marketService = inject(MarketService);

    allMgas = this.marketService.markets; // Signal<MGA[]>
    searchQuery = signal('');

    // Computed signal for reactive filtering
    filteredMgas = computed(() => {
        const query = this.searchQuery().toLowerCase();
        const all = this.allMgas();
        console.log('MGA Component - allMgas count:', all.length, 'query:', query);
        return all.filter(mga =>
            mga.name.toLowerCase().includes(query) ||
            (mga.tier && mga.tier.toLowerCase().includes(query))
        );
    });

    // Sidebar State
    sidebarVisible = false;
    selectedMga: MGA | null = null;

    openDetails(mga: MGA) {
        this.selectedMga = mga;
        this.sidebarVisible = true;
    }

    navigateToMga(mga: MGA) {
        // Future: navigate to MGA detail page
        console.log('Navigate to MGA page:', mga.id);
        // this.router.navigate(['/mga', mga.id]);
    }

    filter(event: any) {
        this.searchQuery.set(event.target.value);
    }

    getRatingSeverity(rating: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
        if (!rating) return 'secondary';
        const r = rating.toUpperCase();
        if (r.startsWith('A')) return 'success';
        if (r.startsWith('B')) return 'warn';
        if (r === 'NR') return 'secondary';
        return 'info';
    }

    getTierSeverity(tier: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
        if (!tier) return 'secondary';
        const t = tier.toUpperCase();
        if (t.includes('TIER 1')) return 'success'; // Gold/Green equivalent
        if (t.includes('TIER 2')) return 'info';    // Blue/Neutral
        if (t.includes('TIER 3')) return 'warn';    // Yellow/Orange
        if (t.includes('TIER 4')) return 'danger';  // Red
        return 'secondary';
    }
}
