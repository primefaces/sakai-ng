import { Component, inject, computed, signal, model, Output, EventEmitter, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { KnowledgeBaseService } from '../../core/services/knowledge-base.service';
import { RiskProfile, CommodityPercentage } from '../../core/models/risk-profile.model';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-operations-step',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
    MultiSelectModule,
    SliderModule,
    ChartModule,
    SelectButtonModule,
    ProgressBarModule
  ],
  template: `
    <div class="step-container">
      <div class="grid h-full">
        <!-- Left Side - Controls -->
        <div class="col-12 lg:col-8 flex flex-column gap-3">
          <!-- General Info Card -->
          <p-card>
            <ng-template pTemplate="header">
              <div class="px-3 py-2 border-bottom-1 surface-border bg-gray-50">
                <h3 class="font-semibold text-base m-0">General Operations</h3>
              </div>
            </ng-template>
            <div class="p-3 grid formgrid">
              
              <!-- Component logic assumes this part existed: Years and ELD/Dashcam -->
              <div class="col-12 md:col-2">
                 <label class="block text-sm font-medium mb-1">Prior Insurance?</label>
                 <p-selectButton 
                    [options]="yesNoOptions" 
                    [(ngModel)]="riskProfile().hasPriorInsurance" 
                    optionLabel="label" 
                    optionValue="value"
                    (onChange)="onPriorInsChange()"
                    styleClass="w-full text-xs">
                 </p-selectButton>
              </div>

              <div class="col-12 md:col-2 animation-duration-200 fadein" *ngIf="riskProfile().hasPriorInsurance">
                <label class="block text-sm font-medium mb-1">Years</label>
                <p-inputNumber 
                  [(ngModel)]="riskProfile().priorInsuranceYears" 
                  [min]="0" 
                  [max]="50" 
                  suffix=" Yrs" 
                  styleClass="w-full" 
                  class="w-full"
                  [inputStyle]="{'width': '100%'}">
                </p-inputNumber>
              </div>
              <div class="col-12 md:col-2" *ngIf="!riskProfile().hasPriorInsurance"></div> <!-- Spacer -->

              <!-- Dash Cam: 3 cols -->
              <div class="col-12 md:col-3">
                  <label class="block text-sm font-medium mb-1">Dash Cam Willingness?</label>
                  <p-selectButton 
                      [options]="yesNoOptions" 
                      [(ngModel)]="riskProfile().willingToInstallDashCam" 
                      optionLabel="label" 
                      optionValue="value"
                      styleClass="w-full text-xs">
                  </p-selectButton>
              </div>

              <!-- ELD: 3 cols -->
              <div class="col-12 md:col-3">
                  <label class="block text-sm font-medium mb-1">Has ELD Device?</label>
                  <p-selectButton 
                      [options]="yesNoOptions" 
                      [(ngModel)]="riskProfile().hasEld" 
                      optionLabel="label" 
                      optionValue="value"
                      styleClass="w-full text-xs">
                  </p-selectButton>
              </div>
            </div>
          </p-card>

          <!-- Commodity Distribution -->
          <p-card styleClass="flex-1">
            <ng-template pTemplate="header">
              <div class="flex justify-content-between align-items-center px-3 py-2 border-bottom-1 surface-border bg-gray-50">
                <h3 class="font-semibold text-base m-0">Commodity Percentages</h3>
                <div class="flex gap-2">
                  <p-button label="Reset" icon="pi pi-refresh" [text]="true" size="small" severity="secondary" (onClick)="resetPercentages()"></p-button>
                  <p-button label="Distribute Evenly" icon="pi pi-chart-pie" [text]="true" size="small" severity="secondary" (onClick)="distributeEvenly()"></p-button>
                </div>
              </div>
            </ng-template>

            <div class="p-3">
              <!-- Commodity Selection -->
              <div class="mb-4">
                <span class="block text-sm font-medium mb-2">Select Commodities (Max 6)</span>
                <p-multiSelect 
                  [options]="availableCommodities()" 
                  [(ngModel)]="selectedItems" 
                  optionLabel="name" 
                  placeholder="Choose commodities..." 
                  [selectionLimit]="6"
                  styleClass="w-full"
                  appendTo="body"
                  (onChange)="onSelectionChange($event)">
                </p-multiSelect>
              </div>

              <!-- Grid Layout for Sliders -->
              <div class="formgrid grid">
                @for (commodity of commodities(); track commodity.name) {
                  <div class="col-12 md:col-6 mb-3">
                    <div class="p-2 surface-card border-1 surface-border border-round h-full flex flex-column justify-content-center">
                        <div class="flex align-items-center gap-2 mb-2">
                            <span class="w-1rem h-1rem border-circle" [style.background-color]="commodity.color"></span>
                            <span class="font-medium flex-1 text-sm">{{ commodity.name }}</span>
                        </div>
                        
                        <div class="flex align-items-center gap-2">
                            <p-slider 
                                [ngModel]="commodity.percentage" 
                                (ngModelChange)="onPercentageChange($index, $event)"
                                [min]="0" 
                                [max]="100" 
                                styleClass="w-full">
                            </p-slider>
                            
                            <p-inputNumber 
                                [ngModel]="commodity.percentage" 
                                (ngModelChange)="onPercentageChange($index, $event)"
                                [min]="0" 
                                [max]="100" 
                                [showButtons]="false"
                                inputStyleClass="w-3rem text-center p-1 text-sm">
                            </p-inputNumber>
                        </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </p-card>
        </div>

        <!-- Right Side - Visualization & Status -->
        <div class="col-12 lg:col-4 flex flex-column gap-3 h-full">
            <p-card styleClass="h-full flex flex-column">
                <ng-template pTemplate="header">
                    <div class="px-3 py-2 border-bottom-1 surface-border bg-gray-50">
                        <h3 class="font-semibold text-base m-0">Visual Distribution</h3>
                    </div>
                </ng-template>
                
                <div class="p-3 flex flex-column h-full">
                    <div class="flex-1 flex align-items-center justify-content-center" style="min-height: 200px;">
                        <p-chart type="doughnut" [data]="chartData" [options]="chartOptions" height="200px" width="100%"></p-chart>
                    </div>

                    <!-- Total Status Moved Here -->
                    <div class="mt-3 p-3 surface-50 border-round flex flex-column gap-2">
                        <div class="flex justify-content-between align-items-center">
                            <span class="font-bold text-sm">Total Distribution</span>
                            <span class="font-bold text-lg" [class.text-green-500]="isValid()" [class.text-red-500]="!isValid()">
                                {{ totalPercentage() }}%
                            </span>
                        </div>

                        <p-progressBar 
                            [value]="totalPercentage()" 
                            [showValue]="false" 
                            [style]="{'height': '10px'}" 
                            [styleClass]="isValid() ? 'bg-green-500' : 'bg-red-500'">
                        </p-progressBar>

                        <div class="text-center pt-1" style="min-height: 1.5rem;">
                            @if (!isValid()) {
                                <span class="text-red-500 font-bold text-sm">
                                    <i class="pi pi-exclamation-triangle mr-1"></i>
                                    {{ getValidationMessage() }}
                                </span>
                            } @else {
                                <span class="text-green-500 font-bold text-sm">
                                    <i class="pi pi-check-circle mr-1"></i>
                                    Distribution Complete
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </p-card>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex justify-content-between mt-3 pt-3 border-top-1 surface-border">
          <p-button label="Back" icon="pi pi-arrow-left" [outlined]="true" severity="secondary" (onClick)="prev.emit()"></p-button>
          <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" [disabled]="!isValid()" (onClick)="next.emit()"></p-button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    .step-container { padding: 0.5rem; height: 100%; display: flex; flex-direction: column; }
  `]
})
export class OperationsStepComponent {
  riskProfile = model.required<RiskProfile>();
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  private kbService = inject(KnowledgeBaseService);
  private themeService = inject(ThemeService);

  commodities = signal<CommodityPercentage[]>([]);
  chartData: any;
  chartOptions: any;

  yesNoOptions = [{ label: 'Yes', value: true }, { label: 'No', value: false }];

  // Available options for the dropdown
  availableCommodities = computed(() => {
    const kbCommodities = this.kbService.commodities();
    return kbCommodities.map((c, index) => ({
      id: c.id,
      name: c.label,
      percentage: 0,
      color: this.getColor(index)
    }));
  });

  // Selected commodities (bound to p-multiSelect)
  selectedItems: CommodityPercentage[] = [];

  constructor() {
    this.initChartOptions();

    // Effect to update chart options when theme changes
    effect(() => {
      const isDark = this.themeService.isDarkMode(); // Dependency tracking
      setTimeout(() => {
        this.initChartOptions();
        this.updateChartData();
      }, 50); // slight delay to allow style calc
    });
  }

  onSelectionChange(event: any) {
    const selected = event.value as CommodityPercentage[];

    // Sync commodities with risk profile if needed, 
    // but for now we just update the local signal which drives the chart
    this.commodities.set(selected);
    this.updateChartData();

    // Update risk profile operations list
    this.riskProfile.update(current => ({
      ...current,
      operations: {
        ...current.operations,
        cargoCommodities: selected.map(c => c.name)
      }
    }));
  }

  onPriorInsChange() {
    if (!this.riskProfile().hasPriorInsurance) {
      this.riskProfile().priorInsuranceYears = undefined;
    }
  }

  private getColor(index: number): string {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899', '#6b7280', '#06b6d4', '#84cc16', '#a855f7'];
    return colors[index % colors.length];
  }

  public totalPercentage = computed(() => {
    return this.commodities().reduce((sum, current) => sum + current.percentage, 0);
  });

  isValid = computed(() => {
    const total = this.totalPercentage();
    const hasCommodities = this.commodities().length > 0;
    return hasCommodities && total === 100;
  });

  onPercentageChange(index: number, value: number) {
    this.commodities.update(items => {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], percentage: value };
      return newItems;
    });
    this.updateChartData();
  }

  updateChartData() {
    const data = this.commodities();

    // We need to ensure we have data to show, otherwise show empty state or handle normally
    this.chartData = {
      labels: data.map(c => c.name),
      datasets: [
        {
          data: data.map(c => c.percentage),
          backgroundColor: data.map(c => c.color),
          hoverBackgroundColor: data.map(c => c.color),
          borderWidth: 0
        }
      ]
    };
  }

  initChartOptions() {
    // Explicitly set colors based on theme to avoid race conditions with getComputedStyle
    const isDark = this.themeService.isDarkMode();
    const textColor = isDark ? '#e5e7eb' : '#374151'; // gray-200 vs gray-700
    const textColorSecondary = isDark ? '#9ca3af' : '#6b7280'; // gray-400 vs gray-500

    this.chartOptions = {
      cutout: '70%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
            usePointStyle: true,
            font: {
              size: 11
            }
          },
          position: 'bottom',
          display: true
        },
        tooltip: {
          enabled: true
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }

  getValidationMessage(): string {
    const total = this.totalPercentage();
    if (this.commodities().length === 0) {
      return 'Please select at least one commodity';
    }
    if (total < 100) {
      return `${100 - total}% Remaining to Allocate`;
    } else if (total > 100) {
      return `${total - 100}% Over Allocation Limit`;
    }
    return '';
  }

  resetPercentages() {
    this.commodities.update(items => items.map(i => ({ ...i, percentage: 0 })));
    this.updateChartData();
  }

  distributeEvenly() {
    const count = this.commodities().length;
    if (count === 0) return;

    const value = Math.floor(100 / count);
    const remainder = 100 % count;

    this.commodities.update(items => items.map((item, index) => ({
      ...item,
      percentage: index < remainder ? value + 1 : value
    })));
    this.updateChartData();
  }
}
