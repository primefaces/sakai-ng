import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfigService } from '../service/config.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-config',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TabsModule,
        ButtonModule,
        InputTextModule,
        TextareaModule,
        CardModule,
        MessageModule,
        FileUploadModule,
        ToastModule,
        ToggleButtonModule,
        DividerModule
    ],
    providers: [MessageService],
    template: `
        <div class="card">
            <h2 class="text-3xl font-bold mb-2">Configuration Center</h2>
            <p class="text-muted-color mb-4">Centralized configuration management for showcase demos and application settings</p>

            <p-tabs value="0">
                <p-tablist>
                    <p-tab value="0">
                        <i class="pi pi-bars mr-2"></i>
                        Menu Configuration
                    </p-tab>
                    <p-tab value="1">
                        <i class="pi pi-palette mr-2"></i>
                        Theme Settings
                    </p-tab>
                    <p-tab value="2">
                        <i class="pi pi-bell mr-2"></i>
                        Notifications
                    </p-tab>
                    <p-tab value="3">
                        <i class="pi pi-th-large mr-2"></i>
                        Dashboard
                    </p-tab>
                    <p-tab value="4">
                        <i class="pi pi-cog mr-2"></i>
                        Advanced
                    </p-tab>
                </p-tablist>
                
                <p-tabpanels>
                    <!-- Menu Configuration Tab -->
                    <p-tabpanel value="0">
                        <div class="flex flex-col gap-4">
                            <p-message severity="info" text="Configure the showcase menu structure. This does not affect the main application menu." />
                            
                            <div class="flex gap-2 flex-wrap">
                                <p-button label="Export YAML" icon="pi pi-download" (onClick)="exportYaml()" />
                                <p-button label="Export JSON" icon="pi pi-download" severity="secondary" (onClick)="exportJson()" />
                                <p-button label="Reset to Default" icon="pi pi-refresh" severity="danger" (onClick)="resetConfig()" />
                            </div>

                            <p-divider />

                            <div>
                                <label class="block font-semibold mb-2">Import Configuration</label>
                                <p-fileUpload
                                    mode="basic"
                                    chooseLabel="Import YAML/JSON"
                                    [auto]="true"
                                    accept=".yaml,.yml,.json"
                                    [maxFileSize]="1000000"
                                    (onSelect)="onFileSelect($event)"
                                    chooseIcon="pi pi-upload"
                                    styleClass="mb-3"
                                />
                            </div>

                            <div>
                                <label class="block font-semibold mb-2 flex items-center justify-between">
                                    <span>Edit Configuration ({{ editMode() === 'yaml' ? 'YAML' : 'JSON' }})</span>
                                    <p-toggleButton
                                        [(ngModel)]="isYamlMode"
                                        onLabel="YAML"
                                        offLabel="JSON"
                                        onIcon="pi pi-file"
                                        offIcon="pi pi-file-edit"
                                        (onChange)="toggleEditMode()"
                                    />
                                </label>
                                <textarea
                                    pInputTextarea
                                    [ngModel]="configCode()"
                                    (ngModelChange)="configCode.set($event)"
                                    [rows]="20"
                                    class="w-full font-mono text-sm"
                                    placeholder="Enter configuration here..."
                                ></textarea>
                            </div>

                            <div class="flex gap-2">
                                <p-button label="Apply Changes" icon="pi pi-check" (onClick)="applyConfigCode()" />
                                <p-button label="Cancel" icon="pi pi-times" severity="secondary" (onClick)="reloadConfigCode()" />
                            </div>

                            @if (errorMessage()) {
                                <p-message severity="error" [text]="errorMessage()" />
                            }
                        </div>
                    </p-tabpanel>

                    <!-- Theme Configuration Tab (Placeholder) -->
                    <p-tabpanel value="1">
                        <div class="flex flex-col gap-4">
                            <p-message severity="info" text="Theme configuration coming soon..." />
                            <div class="p-6 border-2 border-dashed border-surface rounded-border text-center">
                                <i class="pi pi-palette text-4xl text-muted-color mb-3"></i>
                                <h3 class="font-semibold text-xl mb-2">Theme Settings</h3>
                                <p class="text-muted-color">
                                    Configure primary colors, dark mode preferences, and other theme-related settings.
                                    This feature will be implemented in a future update.
                                </p>
                            </div>
                        </div>
                    </p-tabpanel>

                    <!-- Notification Settings Tab (Placeholder) -->
                    <p-tabpanel value="2">
                        <div class="flex flex-col gap-4">
                            <p-message severity="info" text="Notification settings coming soon..." />
                            <div class="p-6 border-2 border-dashed border-surface rounded-border text-center">
                                <i class="pi pi-bell text-4xl text-muted-color mb-3"></i>
                                <h3 class="font-semibold text-xl mb-2">Notification Settings</h3>
                                <p class="text-muted-color">
                                    Enable/disable notifications, configure notification sounds, and manage notification preferences.
                                    This feature will be implemented in a future update.
                                </p>
                            </div>
                        </div>
                    </p-tabpanel>

                    <!-- Dashboard Widgets Tab (Placeholder) -->
                    <p-tabpanel value="3">
                        <div class="flex flex-col gap-4">
                            <p-message severity="info" text="Dashboard configuration coming soon..." />
                            <div class="p-6 border-2 border-dashed border-surface rounded-border text-center">
                                <i class="pi pi-th-large text-4xl text-muted-color mb-3"></i>
                                <h3 class="font-semibold text-xl mb-2">Dashboard Widgets</h3>
                                <p class="text-muted-color">
                                    Customize dashboard widgets, set refresh intervals, and configure widget layouts.
                                    This feature will be implemented in a future update.
                                </p>
                            </div>
                        </div>
                    </p-tabpanel>

                    <!-- Advanced Settings Tab (Placeholder) -->
                    <p-tabpanel value="4">
                        <div class="flex flex-col gap-4">
                            <p-message severity="info" text="Advanced settings coming soon..." />
                            <div class="p-6 border-2 border-dashed border-surface rounded-border text-center">
                                <i class="pi pi-cog text-4xl text-muted-color mb-3"></i>
                                <h3 class="font-semibold text-xl mb-2">Advanced Settings</h3>
                                <p class="text-muted-color">
                                    Configure advanced application settings, API endpoints, performance tuning, and more.
                                    This feature will be implemented in a future update.
                                </p>
                            </div>
                        </div>
                    </p-tabpanel>
                </p-tabpanels>
            </p-tabs>
        </div>

        <p-toast />
    `,
})
export class Config {
    configCode = signal<string>('');
    editMode = signal<'yaml' | 'json'>('yaml');
    errorMessage = signal<string>('');
    isYamlMode = true;

    constructor(
        private configService: ConfigService,
        private messageService: MessageService
    ) {
        this.reloadConfigCode();
        console.log('Config component initialized, code length:', this.configCode().length);
    }

    toggleEditMode() {
        this.editMode.set(this.isYamlMode ? 'yaml' : 'json');
        this.reloadConfigCode();
    }

    reloadConfigCode() {
        this.errorMessage.set('');
        if (this.editMode() === 'yaml') {
            this.configCode.set(this.configService.exportConfigAsYaml());
        } else {
            this.configCode.set(this.configService.exportConfigAsJson());
        }
    }

    applyConfigCode() {
        try {
            this.errorMessage.set('');
            console.log('Applying config, mode:', this.editMode(), 'code length:', this.configCode().length);
            if (this.editMode() === 'yaml') {
                this.configService.importConfigFromYaml(this.configCode());
            } else {
                this.configService.importConfigFromJson(this.configCode());
            }
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Configuration applied successfully'
            });
            console.log('Config applied successfully');
        } catch (e) {
            console.error('Failed to apply config:', e);
            this.errorMessage.set((e as Error).message);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: (e as Error).message
            });
        }
    }

    exportYaml() {
        const yaml = this.configService.exportConfigAsYaml();
        this.downloadFile(yaml, 'config.yaml', 'text/yaml');
        this.messageService.add({
            severity: 'success',
            summary: 'Exported',
            detail: 'Configuration exported as YAML'
        });
    }

    exportJson() {
        const json = this.configService.exportConfigAsJson();
        this.downloadFile(json, 'config.json', 'application/json');
        this.messageService.add({
            severity: 'success',
            summary: 'Exported',
            detail: 'Configuration exported as JSON'
        });
    }

    resetConfig() {
        this.configService.resetConfig();
        this.reloadConfigCode();
        this.messageService.add({
            severity: 'success',
            summary: 'Reset',
            detail: 'Configuration reset to default'
        });
    }

    onFileSelect(event: any) {
        const file = event.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e: any) => {
            try {
                const content = e.target.result;
                const isJson = file.name.endsWith('.json');

                if (isJson) {
                    this.configService.importConfigFromJson(content);
                } else {
                    this.configService.importConfigFromYaml(content);
                }

                this.reloadConfigCode();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Imported',
                    detail: `Configuration imported from ${file.name}`
                });
            } catch (e) {
                this.errorMessage.set((e as Error).message);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Import Failed',
                    detail: (e as Error).message
                });
            }
        };
        reader.readAsText(file);
    }

    private downloadFile(content: string, filename: string, mimeType: string) {
        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    }
}
