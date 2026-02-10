import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { BlockConfig, FieldConfig } from './builder.service';

@Component({
    selector: 'app-dynamic-renderer',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        CardModule, PanelModule, TableModule, ButtonModule,
        MessageModule, DividerModule, InputTextModule, TextareaModule,
        CheckboxModule, SelectModule, DatePickerModule, InputNumberModule
    ],
    template: `
        @switch (block.type) {
            @case ('message') {
                <p-message [severity]="block.props?.['severity'] || 'info'" [text]="block.props?.['text'] || ''" styleClass="w-full" />
            }
            @case ('divider') {
                <p-divider [align]="block.props?.['align']" [type]="block.props?.['type']" />
            }
            @case ('button') {
                <p-button
                    [label]="block.props?.['label'] || 'Button'"
                    [icon]="block.props?.['icon']"
                    [severity]="block.props?.['severity']"
                    [outlined]="block.props?.['outlined'] || false"
                    [disabled]="block.props?.['disabled'] || false"
                />
            }
            @case ('card') {
                <p-card [header]="block.props?.['header']" [subheader]="block.props?.['subheader']">
                    <div class="flex flex-col gap-4">
                        @for (child of block.blocks || []; track $index) {
                            <app-dynamic-renderer [block]="child" />
                        }
                    </div>
                </p-card>
            }
            @case ('panel') {
                <p-panel [header]="block.props?.['header'] || 'Panel'" [toggleable]="block.props?.['toggleable'] || false" [collapsed]="block.props?.['collapsed'] || false">
                    <div class="flex flex-col gap-4">
                        @for (child of block.blocks || []; track $index) {
                            <app-dynamic-renderer [block]="child" />
                        }
                    </div>
                </p-panel>
            }
            @case ('form') {
                <div [class]="block.props?.['layout'] === 'grid' ? 'grid grid-cols-12 gap-4' : 'flex flex-col gap-4'">
                    @for (field of block.fields || []; track field.name) {
                        <div [class]="block.props?.['layout'] === 'grid' ? 'col-span-12 md:col-span-6' : ''">
                            @switch (field.type) {
                                @case ('checkbox') {
                                    <div class="flex items-center gap-2">
                                        <p-checkbox
                                            [inputId]="field.name"
                                            [ngModel]="getFormValue(field.name)"
                                            (ngModelChange)="setFormValue(field.name, $event)"
                                            [binary]="true"
                                        />
                                        <label [for]="field.name">{{ field.label }}</label>
                                    </div>
                                }
                                @default {
                                    <label class="block font-medium mb-2">{{ field.label }}@if (field.required) { <span class="text-red-500">*</span> }</label>
                                    @switch (field.type) {
                                        @case ('text') {
                                            <input
                                                pInputText
                                                class="w-full"
                                                [placeholder]="field.placeholder || ''"
                                                [ngModel]="getFormValue(field.name)"
                                                (ngModelChange)="setFormValue(field.name, $event)"
                                            />
                                        }
                                        @case ('number') {
                                            <p-inputnumber
                                                class="w-full"
                                                [ngModel]="getFormValue(field.name)"
                                                (ngModelChange)="setFormValue(field.name, $event)"
                                                [placeholder]="field.placeholder || ''"
                                                styleClass="w-full"
                                            />
                                        }
                                        @case ('textarea') {
                                            <textarea
                                                pInputTextarea
                                                class="w-full"
                                                [rows]="field.rows || 3"
                                                [placeholder]="field.placeholder || ''"
                                                [ngModel]="getFormValue(field.name)"
                                                (ngModelChange)="setFormValue(field.name, $event)"
                                            ></textarea>
                                        }
                                        @case ('select') {
                                            <p-select
                                                [options]="field.options || []"
                                                [ngModel]="getFormValue(field.name)"
                                                (ngModelChange)="setFormValue(field.name, $event)"
                                                [placeholder]="field.placeholder || 'Select...'"
                                                styleClass="w-full"
                                            />
                                        }
                                        @case ('date') {
                                            <p-datepicker
                                                [ngModel]="getFormValue(field.name)"
                                                (ngModelChange)="setFormValue(field.name, $event)"
                                                styleClass="w-full"
                                            />
                                        }
                                        @default {
                                            <input
                                                pInputText
                                                class="w-full"
                                                [placeholder]="field.placeholder || ''"
                                                [ngModel]="getFormValue(field.name)"
                                                (ngModelChange)="setFormValue(field.name, $event)"
                                            />
                                        }
                                    }
                                }
                            }
                        </div>
                    }
                </div>
            }
            @case ('table') {
                <p-table
                    [value]="block.data || []"
                    [paginator]="block.props?.['paginator'] || false"
                    [rows]="block.props?.['rows'] || 10"
                    [showGridlines]="block.props?.['showGridlines'] || false"
                    [stripedRows]="true"
                >
                    <ng-template #header>
                        <tr>
                            @for (col of block.columns || []; track col.field) {
                                <th>{{ col.header }}</th>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #body let-row>
                        <tr>
                            @for (col of block.columns || []; track col.field) {
                                <td>{{ row[col.field] }}</td>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #emptymessage>
                        <tr>
                            <td [colSpan]="(block.columns || []).length" class="text-center text-muted-color p-4">
                                No data available
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            }
            @default {
                <p-message severity="warn" [text]="'Unknown block type: ' + block.type" styleClass="w-full" />
            }
        }
    `
})
export class DynamicRendererComponent {
    @Input() block!: BlockConfig;

    private formData: Record<string, any> = {};

    getFormValue(name: string): any {
        return this.formData[name] ?? null;
    }

    setFormValue(name: string, value: any): void {
        this.formData = { ...this.formData, [name]: value };
    }
}
