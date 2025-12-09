import { Component, model, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RiskProfile, LossRecord } from '../../core/models/risk-profile.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-loss-history-step',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        TableModule,
        DialogModule,
        InputTextModule,
        InputNumberModule,
        SelectButtonModule,
        DatePickerModule,
        TextareaModule,
        CheckboxModule
    ],
    template: `
    <div class="loss-history-container">
      <!-- Header -->
      <div class="step-header">
        <div>
          <h2 class="step-title">Loss History</h2>
          <p class="step-description">Record any insurance losses in the last 3 years</p>
        </div>
        <p-button 
          label="Add Loss Record" 
          icon="pi pi-plus"
          (onClick)="openDialog()"
          [disabled]="noLosses">
        </p-button>
      </div>

      <div class="mb-4 p-3 surface-100 border-round flex align-items-center">
        <p-checkbox [(ngModel)]="noLosses" [binary]="true" inputId="noLossesCheck" (onChange)="onNoLossesChange()"></p-checkbox>
        <label for="noLossesCheck" class="ml-2 font-bold cursor-pointer">
            I confirm there are NO losses in the past 3 years.
        </label>
      </div>

      <!-- Losses Table -->
      <p-table 
        [value]="riskProfile().lossHistory" 
        styleClass="p-datatable-striped"
        [tableStyle]="{ 'min-width': '60rem' }">
        <ng-template pTemplate="header">
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Carrier</th>
            <th style="width: 10rem">Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-loss>
          <tr>
            <td>{{ loss.date | date:'mediumDate' }}</td>
            <td><div class="font-bold">{{ loss.type }}</div></td>
            <td>{{ loss.amount | currency }}</td>
            <td>
                <span [class]="'loss-status status-' + loss.status.toLowerCase()">
                    {{ loss.status }}
                </span>
            </td>
            <td>{{ loss.insuranceCarrier || 'N/A' }}</td>
            <td>
              <div class="flex gap-2">
                <p-button 
                  icon="pi pi-pencil" 
                  [text]="true"
                  severity="info"
                  (onClick)="editLoss(loss)">
                </p-button>
                <p-button 
                  icon="pi pi-trash" 
                  [text]="true"
                  severity="danger"
                  (onClick)="confirmDelete(loss)">
                </p-button>
              </div>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="6" class="text-center p-4">
              <div class="empty-state">
                <i class="pi pi-shield empty-icon"></i>
                <p class="empty-text">No loss records added</p>
                @if (!noLosses) {
                    <p class="empty-subtext">Click "Add Loss Record" if applicable</p>
                }
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <!-- Navigation -->
      <div class="flex justify-content-between mt-6 pt-4 border-top-1 surface-border step-actions">
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
              (onClick)="onNext()">
          </p-button>
      </div>

      <!-- Add/Edit Dialog -->
      <p-dialog 
        [(visible)]="displayDialog" 
        [header]="editMode ? 'Edit Loss Record' : 'Add Loss Record'"
        [modal]="true"
        [style]="{ width: '500px' }"
        styleClass="brutal-dialog">
        
        <div class="flex flex-column gap-3 py-2">
            
            <div class="grid">
                <div class="col-6">
                    <label class="font-bold block mb-2">Date of Loss</label>
                    <p-datePicker 
                        [(ngModel)]="currentLoss.date"
                        dateFormat="mm/dd/yy"
                        [showIcon]="true"
                        styleClass="w-full"
                        appendTo="body">
                    </p-datePicker>
                </div>
                <div class="col-6">
                    <label class="font-bold block mb-2">Status</label>
                    <p-selectButton 
                        [options]="statusOptions" 
                        [(ngModel)]="currentLoss.status"
                        optionLabel="label"
                        optionValue="value">
                    </p-selectButton>
                </div>
            </div>

            <div>
                <label class="font-bold block mb-2">Type of Loss</label>
                <p-selectButton 
                    [options]="typeOptions" 
                    [(ngModel)]="currentLoss.type"
                    optionLabel="label"
                    optionValue="value"
                    styleClass="w-full text-sm">
                </p-selectButton>
            </div>

            <div class="grid">
                <div class="col-6">
                    <label class="font-bold block mb-2">Amount Paid/Reserved</label>
                    <p-inputNumber 
                        [(ngModel)]="currentLoss.amount" 
                        mode="currency" 
                        currency="USD"
                        class="w-full"
                        styleClass="w-full">
                    </p-inputNumber>
                </div>
                <div class="col-6">
                    <label class="font-bold block mb-2">Carrier Name</label>
                    <input pInputText [(ngModel)]="currentLoss.insuranceCarrier" class="w-full" placeholder="e.g. Progressive" />
                </div>
            </div>

            <div>
                <label class="font-bold block mb-2">Description</label>
                <textarea pTextarea [(ngModel)]="currentLoss.description" rows="3" class="w-full"></textarea>
            </div>

        </div>

        <ng-template pTemplate="footer">
          <p-button label="Cancel" severity="secondary" [text]="true" (onClick)="closeDialog()"></p-button>
          <p-button [label]="editMode ? 'Update' : 'Add Record'" (onClick)="saveLoss()"></p-button>
        </ng-template>
      </p-dialog>
    </div>
  `,
    styles: [`
    :host { display: block; height: 100%; }
    .loss-history-container { padding: 0.5rem; height: 100%; display: flex; flex-direction: column; }
    .step-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-shrink: 0; }
    .step-title { font-size: 1.5rem; font-weight: 700; margin: 0; color: var(--text-color); }
    .step-description { font-size: 0.9rem; color: var(--text-color-secondary); margin: 0; }
    
    .loss-status { padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; }
    .status-open { background: var(--red-100); color: var(--red-700); }
    .status-closed { background: var(--green-100); color: var(--green-700); }

    :host ::ng-deep .p-datatable-wrapper { flex: 1; overflow-y: auto; }
    .step-actions { margin-top: auto; flex-shrink: 0; }
    .empty-state { text-align: center; padding: 3rem; }
    .empty-icon { font-size: 4rem; color: var(--text-color-secondary); margin-bottom: 1rem; }
    
    /* Neobrutalist Dialog Override */
    :host ::ng-deep .brutal-dialog .p-dialog-header {
        background: #2D2D2D;
        color: #fff;
        border-bottom: 3px solid #000;
    }
  `]
})
export class LossHistoryStepComponent {
    riskProfile = model.required<RiskProfile>();
    next = output<void>();
    prev = output<void>();

    displayDialog = false;
    editMode = false;
    noLosses = false;

    currentLoss: LossRecord = this.getEmptyLoss();

    typeOptions = [
        { label: 'Auto Liability', value: 'AL' },
        { label: 'Physical Damage', value: 'PD' },
        { label: 'Cargo', value: 'Cargo' },
        { label: 'General Liability', value: 'GL' }
    ];

    statusOptions = [
        { label: 'Open', value: 'Open' },
        { label: 'Closed', value: 'Closed' }
    ];

    openDialog() {
        this.currentLoss = this.getEmptyLoss();
        this.editMode = false;
        this.displayDialog = true;
    }

    editLoss(loss: LossRecord) {
        this.currentLoss = { ...loss };
        this.editMode = true;
        this.displayDialog = true;
    }

    saveLoss() {
        if (!this.currentLoss.amount && this.currentLoss.amount !== 0) {
            Swal.fire('Error', 'Amount is required', 'error');
            return;
        }

        const profile = this.riskProfile();
        let history = [...(profile.lossHistory || [])];

        if (this.editMode) {
            const index = history.findIndex(l => l.id === this.currentLoss.id);
            if (index > -1) history[index] = this.currentLoss;
        } else {
            this.currentLoss.id = Date.now().toString();
            history.push(this.currentLoss);
        }

        this.riskProfile.update(current => ({ ...current, lossHistory: history }));
        this.noLosses = false; // Reset if they add a loss
        this.closeDialog();

        Swal.fire({
            title: this.editMode ? 'Updated' : 'Added',
            text: 'Loss record saved successfully',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    }

    confirmDelete(loss: LossRecord) {
        Swal.fire({
            title: 'Delete Record?',
            text: 'Are you sure you want to remove this loss record?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result: any) => {
            if (result.isConfirmed) {
                const profile = this.riskProfile();
                const history = profile.lossHistory.filter(l => l.id !== loss.id);
                this.riskProfile.update(current => ({ ...current, lossHistory: history }));

                Swal.fire(
                    'Deleted!',
                    'Record has been removed.',
                    'success'
                );
            }
        });
    }

    closeDialog() {
        this.displayDialog = false;
    }

    onNoLossesChange() {
        if (this.noLosses) {
            if (this.riskProfile().lossHistory.length > 0) {
                Swal.fire({
                    title: 'Clear Records?',
                    text: 'Checking "No Losses" will remove existing records. Continue?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, clear all'
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        this.riskProfile.update(current => ({ ...current, lossHistory: [] }));
                    } else {
                        this.noLosses = false;
                    }
                });
            }
        }
    }

    onNext() {
        const history = this.riskProfile().lossHistory || [];
        if (history.length === 0 && !this.noLosses) {
            Swal.fire('Confirmation Required', 'Please add loss records or check "No losses" to proceed.', 'warning');
            return;
        }
        this.next.emit();
    }

    private getEmptyLoss(): LossRecord {
        return {
            id: '',
            date: new Date(),
            type: 'AL',
            status: 'Closed',
            amount: 0,
            insuranceCarrier: ''
        };
    }
}
