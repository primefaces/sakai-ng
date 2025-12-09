import { Component, signal, inject, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { Driver } from '../../core/models/risk-profile.model';
import { KnowledgeBaseService } from '../../core/services/knowledge-base.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-drivers-step',
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
    DatePickerModule
  ],
  providers: [],
  template: `
    <div class="drivers-container">
      
      <!-- Header -->
      <div class="step-header">
        <div>
          <h2 class="step-title">Drivers Information</h2>
          <p class="step-description">Add and manage drivers for this quote</p>
        </div>
        <p-button 
          label="Add Driver" 
          icon="pi pi-plus"
          (onClick)="openDialog()">
        </p-button>
      </div>

      <!-- Drivers Table -->
      <p-table 
        [value]="drivers()" 
        styleClass="p-datatable-striped"
        [tableStyle]="{ 'min-width': '60rem' }">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>License Number</th>
            <th>State</th>
            <th>Years Experience</th>
            <th>Date of Birth</th>
            <th style="width: 12rem">Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-driver>
          <tr>
            <td>{{ driver.name }}</td>
            <td>{{ driver.licenseNumber }}</td>
            <td>{{ driver.licenseState }}</td>
            <td>{{ driver.yearsExperience }}</td>
            <td>{{ driver.dob | date:'mediumDate' }}</td>
            <td>
              <div class="flex gap-2">
                <p-button 
                  icon="pi pi-pencil" 
                  [text]="true"
                  severity="info"
                  (onClick)="editDriver(driver)">
                </p-button>
                <p-button 
                  icon="pi pi-trash" 
                  [text]="true"
                  severity="danger"
                  (onClick)="confirmDelete(driver)">
                </p-button>
              </div>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="6" class="text-center p-4">
              <div class="empty-state">
                <i class="pi pi-users empty-icon"></i>
                <p class="empty-text">No drivers added yet</p>
                <p class="empty-subtext">Click "Add Driver" to get started</p>
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

      <!-- Add/Edit Driver Dialog -->
      <p-dialog 
        [(visible)]="displayDialog" 
        [header]="editMode ? 'Edit Driver' : 'Add New Driver'"
        [modal]="true"
        [style]="{ width: '600px' }"
        [draggable]="false"
        [resizable]="false">
        
        <div class="dialog-content">
          <div class="field">
            <label for="name" class="field-label">Full Name *</label>
            <input 
              pInputText 
              id="name" 
              [(ngModel)]="currentDriver.name"
              placeholder="Enter driver's full name"
              class="w-full" />
          </div>

          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="field">
                <label for="license" class="field-label">License Number *</label>
                <input 
                  pInputText 
                  id="license" 
                  [(ngModel)]="currentDriver.licenseNumber"
                  placeholder="License number"
                  class="w-full" />
              </div>
            </div>
            <div class="col-12 md:col-3">
              <div class="field">
                <label for="state" class="field-label">State *</label>
                <p-select 
                  [(ngModel)]="currentDriver.licenseState"
                  [options]="states()"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select"
                  styleClass="w-full"
                  appendTo="body">
                </p-select>
              </div>
            </div>
            <div class="col-12 md:col-3">
              <div class="field">
                <label for="licenseType" class="field-label">Type *</label>
                <p-select 
                  [(ngModel)]="currentDriver.licenseType"
                  [options]="licenseTypes()"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select"
                  styleClass="w-full"
                  appendTo="body">
                </p-select>
              </div>
            </div>
          </div>

          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="field">
                <label for="experience" class="field-label">Years Experience *</label>
                <p-inputNumber 
                  [(ngModel)]="currentDriver.yearsExperience"
                  [min]="0"
                  [max]="50"
                  styleClass="w-full">
                </p-inputNumber>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="field">
                <label for="dob" class="field-label">Date of Birth *</label>
                <p-datePicker 
                    inputId="dob"
                    [(ngModel)]="currentDriver.dob"
                    dateFormat="mm/dd/yy"
                    [showIcon]="true"
                    styleClass="w-full"
                    [maxDate]="maxDate"
                    appendTo="body">
                </p-datePicker>
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
            [label]="editMode ? 'Update' : 'Add Driver'"
            (onClick)="saveDriver()">
          </p-button>
        </ng-template>
      </p-dialog>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    
    .drivers-container {
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
        margin-bottom: 0.5rem;
    }

    /* Fixed Bottom Navigation */
    .flex.justify-content-between.mt-6 {
        margin-top: auto !important;
        padding-top: 1rem;
        border-top: 1px solid var(--surface-border);
        flex-shrink: 0;
    }
    
    .field { margin-bottom: 1.5rem; }
    .field-label { display: block; font-weight: 600; margin-bottom: 0.5rem; }

    @media (max-width: 768px) {
      .step-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
    }
  `]
})
export class DriversStepComponent {
  private kbService = inject(KnowledgeBaseService);

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  drivers = signal<Driver[]>([]);
  displayDialog = false;
  editMode = false;
  currentDriver: Driver = this.getEmptyDriver();
  maxDate = new Date();

  states = computed(() => this.kbService.usStates().map(s => ({ label: `${s.name} (${s.code})`, value: s.code })));
  licenseTypes = computed(() => this.kbService.licenseTypes().map(l => ({ label: l.label, value: l.code })));

  openDialog() {
    this.editMode = false;
    this.currentDriver = this.getEmptyDriver();
    this.displayDialog = true;
  }

  editDriver(driver: Driver) {
    this.editMode = true;
    this.currentDriver = { ...driver };
    this.displayDialog = true;
  }

  saveDriver() {
    if (!this.validateDriver()) {
      return;
    }

    if (this.editMode) {
      const index = this.drivers().findIndex(d => d.id === this.currentDriver.id);
      if (index !== -1) {
        const updated = [...this.drivers()];
        updated[index] = { ...this.currentDriver };
        this.drivers.set(updated);
        Swal.fire({
          title: 'Updated!',
          text: 'Driver information updated.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } else {
      this.currentDriver.id = Date.now().toString();
      this.drivers.set([...this.drivers(), this.currentDriver]);
      Swal.fire({
        title: 'Added!',
        text: 'Driver added successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }

    this.closeDialog();
  }

  confirmDelete(driver: Driver) {
    Swal.fire({
      title: 'Delete Driver?',
      text: `Are you sure you want to remove ${driver.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove them!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.drivers.set(this.drivers().filter(d => d.id !== driver.id));
        Swal.fire({
          title: 'Removed!',
          text: 'Driver has been removed.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  closeDialog() {
    this.displayDialog = false;
    this.currentDriver = this.getEmptyDriver();
  }

  private validateDriver(): boolean {
    if (!this.currentDriver.name || !this.currentDriver.licenseNumber ||
      !this.currentDriver.licenseState || !this.currentDriver.yearsExperience ||
      !this.currentDriver.dob) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill all required fields.',
        icon: 'warning',
        confirmButtonColor: '#FF6600'
      });
      return false;
    }
    return true;
  }

  private getEmptyDriver(): Driver {
    return {
      id: '',
      name: '',
      licenseNumber: '',
      licenseState: '',
      licenseType: '',
      licenseDate: '',
      yearsExperience: 0,
      dob: null,
      violations: [],
      accidents: []
    };
  }
}
