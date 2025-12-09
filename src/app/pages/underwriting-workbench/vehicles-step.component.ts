import { Component, signal, inject, Output, EventEmitter, model, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import Swal from 'sweetalert2';

import { RiskProfile, Vehicle } from '../../core/models/risk-profile.model';
import { KnowledgeBaseService } from '../../core/services/knowledge-base.service';

@Component({
  selector: 'app-vehicles-step',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    ProgressSpinnerModule
  ],
  providers: [],
  template: `
    <div class="vehicles-container">
      
      <!-- Header -->
      <div class="step-header">
        <div>
          <h2 class="step-title">Vehicles Information</h2>
          <p class="step-description">Add and manage vehicles for this quote</p>
        </div>
        <p-button 
          label="Add Vehicle" 
          icon="pi pi-plus"
          (onClick)="openDialog()">
        </p-button>
      </div>

      <!-- Vehicles Table -->
      <p-table 
        [value]="vehicles()" 
        styleClass="p-datatable-striped"
        [tableStyle]="{ 'min-width': '70rem' }">
        <ng-template pTemplate="header">
          <tr>
            <th>VIN</th>
            <th>Year</th>
            <th>Make</th>
            <th>Model</th>
            <th>Type</th>
            <th>GVWR</th>
            <th style="width: 12rem">Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-vehicle>
          <tr>
            <td><span class="font-mono">{{ vehicle.vin }}</span></td>
            <td>{{ vehicle.year }}</td>
            <td>{{ vehicle.make }}</td>
            <td>{{ vehicle.model }}</td>
            <td>{{ vehicle.type }}</td>
            <td>{{ vehicle.gvwr | number }} lbs</td>
            <td>
              <div class="flex gap-2">
                <p-button 
                  icon="pi pi-pencil" 
                  [text]="true"
                  severity="info"
                  (onClick)="editVehicle(vehicle)">
                </p-button>
                <p-button 
                  icon="pi pi-trash" 
                  [text]="true"
                  severity="danger"
                  (onClick)="confirmDelete(vehicle)">
                </p-button>
              </div>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="7" class="text-center p-4">
              <div class="empty-state">
                <i class="pi pi-car empty-icon"></i>
                <p class="empty-text">No vehicles added yet</p>
                <p class="empty-subtext">Click "Add Vehicle" to get started</p>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <!-- Navigation Buttons -->
      <div class="flex justify-content-between mt-6 pt-4 border-top-1 surface-border">
          <p-button 
              label="Back" 
              icon="pi pi-arrow-left" 
              [outlined]="true"
              severity="secondary"
              (onClick)="prev.emit()">
          </p-button>
          <p-button 
              label="Next" 
              icon="pi pi-arrow-right" 
              iconPos="right"
              (onClick)="next.emit()">
          </p-button>
      </div>

      <!-- Add/Edit Vehicle Dialog -->
      <p-dialog 
        [(visible)]="displayDialog" 
        [header]="editMode ? 'Edit Vehicle' : 'Add New Vehicle'"
        [modal]="true"
        [style]="{ width: '700px' }"
        [draggable]="false"
        [resizable]="false">
        
        <div class="dialog-content">
          <!-- VIN Decoder Section -->
          <div class="vin-decoder-section">
            <label for="vin" class="field-label">
              VIN Number *
              <span class="text-xs text-color-secondary ml-2">(Auto-decode vehicle info)</span>
            </label>
            <div class="flex gap-2">
              <input 
                pInputText 
                id="vin" 
                [(ngModel)]="currentVehicle.vin"
                placeholder="Enter 17-character VIN"
                maxlength="17"
                class="flex-1"
                (input)="onVinInput()"
                [disabled]="decodingVin" />
              <p-button 
                label="Decode"
                icon="pi pi-search"
                [loading]="decodingVin"
                [disabled]="currentVehicle.vin.length !== 17"
                (onClick)="decodeVin()">
              </p-button>
            </div>
            @if (decodingVin) {
              <div class="flex align-items-center gap-2 mt-2">
                <p-progressSpinner 
                  [style]="{ width: '20px', height: '20px' }"
                  strokeWidth="4">
                </p-progressSpinner>
                <span class="text-sm text-color-secondary">Decoding VIN...</span>
              </div>
            }
          </div>

          <!-- Vehicle Details -->
          <div class="grid">
            <div class="col-12 md:col-4">
              <div class="field">
                <label for="year" class="field-label">Year *</label>
                <p-inputNumber 
                  [(ngModel)]="currentVehicle.year"
                  [min]="1980"
                  [max]="2025"
                  [useGrouping]="false"
                  styleClass="w-full"
                  [inputStyle]="{'width': '100%'}">
                </p-inputNumber>
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="field">
                <label for="make" class="field-label">Make *</label>
                <input 
                  pInputText 
                  id="make" 
                  [(ngModel)]="currentVehicle.make"
                  placeholder="e.g., Freightliner"
                  class="w-full" />
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="field">
                <label for="model" class="field-label">Model *</label>
                <input 
                  pInputText 
                  id="model" 
                  [(ngModel)]="currentVehicle.model"
                  placeholder="e.g., Cascadia"
                  class="w-full" />
              </div>
            </div>
          </div>

          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="field">
                <label for="type" class="field-label">Vehicle Type *</label>
                <p-select 
                  [(ngModel)]="currentVehicle.type"
                  [options]="vehicleTypes()"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select type"
                  styleClass="w-full"
                  appendTo="body">
                </p-select>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="field">
                <label for="gvwr" class="field-label">GVWR (lbs) *</label>
                <p-inputNumber 
                  [(ngModel)]="currentVehicle.gvwr"
                  [min]="0"
                  [useGrouping]="true"
                  placeholder="Gross Vehicle Weight Rating"
                  styleClass="w-full"
                  [inputStyle]="{'width': '100%'}">
                </p-inputNumber>
              </div>
            </div>
          </div>
        </div>

        <ng-template pTemplate="footer">
          <p-button 
            label="Cancel" 
            severity="secondary"
            [outlined]="true"
            (onClick)="closeDialog()">
          </p-button>
          <p-button 
            [label]="editMode ? 'Update' : 'Add Vehicle'"
            (onClick)="saveVehicle()">
          </p-button>
        </ng-template>
      </p-dialog>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }

    .vehicles-container {
      padding: 0.5rem;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .step-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-shrink: 0;
    }

    .step-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-color);
      margin: 0 0 0.25rem 0;
    }

    .step-description {
      font-size: 0.9rem;
      color: var(--text-color-secondary);
      margin: 0;
    }

    /* Table Scroll Handling */
    :host ::ng-deep .p-datatable {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    
    :host ::ng-deep .p-datatable-wrapper {
        flex: 1;
        overflow-y: auto;
    }

    .dialog-content {
      padding: 1rem 0;
    }

    .vin-decoder-section {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--surface-border);
    }

    .field {
      margin-bottom: 1.5rem;
    }

    .field-label {
      display: block;
      color: var(--text-color);
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .font-mono {
      font-family: 'Courier New', monospace;
      font-weight: 600;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
    }

    .empty-icon {
      font-size: 4rem;
      color: var(--text-color-secondary);
      opacity: 0.5;
      margin-bottom: 1rem;
    }

    .empty-text {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-color);
      margin: 0 0 0.5rem 0;
    }

    .empty-subtext {
      font-size: 1rem;
      color: var(--text-color-secondary);
      margin: 0;
    }

    /* Fixed Bottom Navigation */
    .flex.justify-content-between.mt-6 {
        margin-top: auto !important;
        padding-top: 1rem;
        border-top: 1px solid var(--surface-border);
        flex-shrink: 0;
    }

    @media (max-width: 768px) {
      .step-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `]
})
export class VehiclesStepComponent {
  private kbService = inject(KnowledgeBaseService);
  private http = inject(HttpClient);

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  vehicles = model<Vehicle[]>([]);
  displayDialog = false;
  editMode = false;
  decodingVin = false;
  currentVehicle: Vehicle = this.getEmptyVehicle();

  vehicleTypes = computed(() => this.kbService.vehicleTypes().map(v => ({ label: v.label, value: v.id })));

  onVinInput() {
    if (this.currentVehicle.vin) {
      this.currentVehicle.vin = this.currentVehicle.vin.toUpperCase();
    }
  }

  async decodeVin() {
    if (!this.currentVehicle.vin || this.currentVehicle.vin.length !== 17) {
      Swal.fire('Invalid VIN', 'VIN must be exactly 17 characters', 'warning');
      return;
    }

    this.decodingVin = true;

    // Show loading
    Swal.fire({
      title: 'Decoding VIN...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const response: any = await this.http.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${this.currentVehicle.vin}?format=json`
      ).toPromise();

      Swal.close(); // Close loading

      if (response && response.Results) {
        const results = response.Results;

        // Extract relevant data
        const makeResult = results.find((r: any) => r.Variable === 'Make');
        const modelResult = results.find((r: any) => r.Variable === 'Model');
        const yearResult = results.find((r: any) => r.Variable === 'Model Year');
        const gvwrResult = results.find((r: any) => r.Variable === 'Gross Vehicle Weight Rating From');

        this.currentVehicle.make = makeResult?.Value || this.currentVehicle.make;
        this.currentVehicle.model = modelResult?.Value || this.currentVehicle.model;
        this.currentVehicle.year = yearResult?.Value ? parseInt(yearResult.Value) : this.currentVehicle.year;

        // Fix GVWR parsing: Extract only the lbs part (e.g., "Class 8: 33,001 lb..." -> 33001)
        if (gvwrResult?.Value) {
          // Look for the number sequence immediately preceding "lb" (case insensitive)
          const lbsMatch = gvwrResult.Value.match(/([\d,]+)\s*lb/i);
          if (lbsMatch && lbsMatch[1]) {
            this.currentVehicle.gvwr = parseInt(lbsMatch[1].replace(/,/g, ''));
          } else {
            // Fallback: If no "lb" found, just take the first realistic number (longer than 3 digits) or just the first number group
            // This avoids capturing "Class 8" as 8.
            const numbers = gvwrResult.Value.match(/\d+/g);
            if (numbers) {
              // Find the first number that is likely a weight (> 1000)
              const likelyWeight = numbers.find((n: string) => parseInt(n) > 1000);
              this.currentVehicle.gvwr = likelyWeight ? parseInt(likelyWeight) : 0;
            }
          }
        }

        // Map Body Class to Vehicle Type
        const bodyClassResult = results.find((r: any) => r.Variable === 'Body Class' || r.Variable === 'Vehicle Type');
        if (bodyClassResult?.Value) {
          this.currentVehicle.type = this.mapBodyClassToType(bodyClassResult.Value);
        }

        Swal.fire({
          title: 'Decoded!',
          text: 'Vehicle information retrieved successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      Swal.fire('Error', 'Could not decode VIN. Please enter details manually.', 'error');
    } finally {
      this.decodingVin = false;
    }
  }

  openDialog() {
    this.editMode = false;
    this.currentVehicle = this.getEmptyVehicle();
    this.displayDialog = true;
  }

  editVehicle(vehicle: Vehicle) {
    this.editMode = true;
    this.currentVehicle = { ...vehicle };
    this.displayDialog = true;
  }

  saveVehicle() {
    if (!this.validateVehicle()) {
      return;
    }

    if (this.editMode) {
      const index = this.vehicles().findIndex(v => v.id === this.currentVehicle.id);
      if (index !== -1) {
        const updated = [...this.vehicles()];
        updated[index] = { ...this.currentVehicle };
        this.vehicles.set(updated);
      }
      Swal.fire({
        title: 'Updated',
        text: 'Vehicle updated successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      this.currentVehicle.id = Date.now().toString();
      this.vehicles.set([...this.vehicles(), this.currentVehicle]);
      Swal.fire({
        title: 'Added',
        text: 'Vehicle added successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }

    this.closeDialog();
  }

  confirmDelete(vehicle: Vehicle) {
    Swal.fire({
      title: 'Delete Vehicle?',
      text: `Are you sure you want to remove this ${vehicle.year} ${vehicle.make} ${vehicle.model}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicles.set(this.vehicles().filter(v => v.id !== vehicle.id));
        Swal.fire({
          title: 'Deleted!',
          text: 'Vehicle has been removed.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  closeDialog() {
    this.displayDialog = false;
    this.currentVehicle = this.getEmptyVehicle();
  }

  private validateVehicle(): boolean {
    if (!this.currentVehicle.vin || !this.currentVehicle.year ||
      !this.currentVehicle.make || !this.currentVehicle.model ||
      !this.currentVehicle.type || !this.currentVehicle.gvwr) {
      Swal.fire('Validation Error', 'Please fill all required fields', 'warning');
      return false;
    }
    if (this.currentVehicle.vin.length !== 17) {
      Swal.fire('Invalid VIN', 'VIN must be exactly 17 characters', 'warning');
      return false;
    }
    return true;
  }

  private getEmptyVehicle(): Vehicle {
    return {
      id: '',
      vin: '',
      year: new Date().getFullYear(),
      make: '',
      model: '',
      gvwr: 0,
      type: '',
      value: 0,
      usage: 'Primary'
    };
  }

  private mapBodyClassToType(bodyClass: string): string {
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');
    const bc = normalize(bodyClass);

    if (bc.includes('tractor')) return 'truck_tractor';
    if (bc.includes('trailer')) return 'trailer';
    if (bc.includes('pickup') || bc.includes('lightup')) return 'pickup'; // light pickup
    if (bc.includes('van') && bc.includes('cargo')) return 'cargo_van';
    if (bc.includes('van') && !bc.includes('mini')) return 'cargo_van'; // broad match for vans
    if (bc.includes('box') || bc.includes('straight')) return 'box_truck';

    // Default fallback or smart guess
    if (bc.includes('truck')) return 'box_truck';

    return '';
  }
}
