import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplitterModule } from 'primeng/splitter';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LayoutBuilderService } from './builder.service';
import { DynamicRendererComponent } from './dynamic-renderer.component';
import { CodemirrorComponent } from './codemirror.component';
import { LayoutService } from '@/app/layout/service/layout.service';

@Component({
    selector: 'app-layout-builder',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        SplitterModule, TabsModule, ButtonModule,
        MessageModule, FileUploadModule, ToastModule,
        DynamicRendererComponent, CodemirrorComponent
    ],
    providers: [MessageService],
    template: `
        <div class="card">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h2 class="text-3xl font-bold mb-1">Layout Builder</h2>
                    <p class="text-muted-color">Define pages and components using YAML, see them rendered live</p>
                </div>
                <div class="flex gap-2 flex-wrap">
                    <p-button label="Export YAML" icon="pi pi-download" size="small" (onClick)="exportYaml()" />
                    <p-button label="Export JSON" icon="pi pi-download" size="small" severity="secondary" (onClick)="exportJson()" />
                    <p-fileUpload
                        mode="basic"
                        chooseLabel="Import"
                        chooseIcon="pi pi-upload"
                        [auto]="true"
                        accept=".yaml,.yml,.json"
                        [maxFileSize]="1000000"
                        (onSelect)="onFileImport($event)"
                        size="small"
                    />
                    <p-button label="Reset" icon="pi pi-refresh" size="small" severity="danger" (onClick)="reset()" />
                </div>
            </div>

            <p-splitter [style]="{ height: 'calc(100vh - 240px)' }" [panelSizes]="[40, 60]" [minSizes]="[25, 35]">
                <ng-template #panel>
                    <div class="flex flex-col h-full w-full p-3 gap-3">
                        <div class="flex items-center justify-between">
                            <span class="font-semibold">YAML Editor</span>
                            <div class="flex gap-2">
                                <p-button label="Apply" icon="pi pi-check" size="small" severity="success" (onClick)="applyChanges()" />
                            </div>
                        </div>

                        @for (err of builderService.errors(); track $index) {
                            <p-message severity="error" [text]="err" styleClass="w-full" />
                        }

                        <app-codemirror
                            [value]="editorCode()"
                            (valueChange)="editorCode.set($event)"
                            [darkMode]="isDark()"
                            class="flex-1 min-h-0"
                        />
                    </div>
                </ng-template>

                <ng-template #panel>
                    <div class="flex flex-col h-full w-full p-3 overflow-y-auto">
                        <span class="font-semibold mb-3">Live Preview</span>

                        @if (builderService.pages().length > 0) {
                            <p-tabs [value]="builderService.selectedPageId() || builderService.pages()[0]?.id" (valueChange)="builderService.selectedPageId.set($event + '')">
                                <p-tablist>
                                    @for (page of builderService.pages(); track page.id) {
                                        <p-tab [value]="page.id">{{ page.title }}</p-tab>
                                    }
                                </p-tablist>
                                <p-tabpanels>
                                    @for (page of builderService.pages(); track page.id) {
                                        <p-tabpanel [value]="page.id">
                                            @if (page.description) {
                                                <p class="text-muted-color mb-4">{{ page.description }}</p>
                                            }
                                            <div class="flex flex-col gap-4">
                                                @for (block of page.blocks; track $index) {
                                                    <app-dynamic-renderer [block]="block" [componentDefaults]="builderService.componentDefaults()" />
                                                }
                                            </div>
                                        </p-tabpanel>
                                    }
                                </p-tabpanels>
                            </p-tabs>
                        } @else {
                            <div class="flex flex-col items-center justify-center flex-1 text-muted-color">
                                <i class="pi pi-code text-4xl mb-3"></i>
                                <p>Write YAML on the left and click "Apply" to see the preview</p>
                            </div>
                        }
                    </div>
                </ng-template>
            </p-splitter>
        </div>

        <p-toast />
    `
})
export class LayoutBuilder {
    builderService = inject(LayoutBuilderService);
    private layoutService = inject(LayoutService);
    private messageService = inject(MessageService);

    editorCode = signal<string>('');
    isDark = computed(() => this.layoutService.isDarkTheme());

    constructor() {
        this.editorCode.set(this.builderService.yamlCode());
    }

    applyChanges(): void {
        const success = this.builderService.applyYaml(this.editorCode());
        if (success) {
            this.messageService.add({
                severity: 'success',
                summary: 'Applied',
                detail: 'Configuration applied successfully'
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to parse YAML. Check errors above.'
            });
        }
    }

    exportYaml(): void {
        this.downloadFile(this.builderService.yamlCode(), 'layout-config.yaml', 'text/yaml');
        this.messageService.add({ severity: 'success', summary: 'Exported', detail: 'YAML exported' });
    }

    exportJson(): void {
        const json = this.builderService.exportAsJson();
        if (json) {
            this.downloadFile(json, 'layout-config.json', 'application/json');
            this.messageService.add({ severity: 'success', summary: 'Exported', detail: 'JSON exported' });
        }
    }

    reset(): void {
        this.builderService.reset();
        this.editorCode.set(this.builderService.yamlCode());
        this.messageService.add({ severity: 'success', summary: 'Reset', detail: 'Configuration reset to default' });
    }

    onFileImport(event: any): void {
        const file = event.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e: any) => {
            try {
                const content = e.target.result as string;
                this.editorCode.set(content);
                const success = this.builderService.applyYaml(content);
                if (success) {
                    this.messageService.add({ severity: 'success', summary: 'Imported', detail: `Imported from ${file.name}` });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Import Error', detail: 'File content is invalid' });
                }
            } catch (err) {
                this.messageService.add({ severity: 'error', summary: 'Import Failed', detail: (err as Error).message });
            }
        };
        reader.readAsText(file);
    }

    private downloadFile(content: string, filename: string, mimeType: string): void {
        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    }
}
