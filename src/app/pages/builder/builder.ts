import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplitterModule } from 'primeng/splitter';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
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
        DialogModule, AccordionModule,
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
                    <p-button label="Guide" icon="pi pi-question-circle" size="small" severity="help" [outlined]="true" (onClick)="showGuide.set(true)" />
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

        <p-dialog header="YAML Component Guide" [(visible)]="showGuide" [modal]="true" [style]="{ width: '720px', maxHeight: '80vh' }" [dismissableMask]="true">
            <p class="text-muted-color mb-4">Reference for all supported block types and their props. Copy snippets directly into your YAML editor.</p>

            <p-accordion [value]="['structure']">
                <p-accordion-panel value="structure">
                    <p-accordion-header>Page Structure</p-accordion-header>
                    <p-accordion-content>
                        <pre class="text-sm bg-surface-100 dark:bg-surface-800 p-3 rounded-lg overflow-x-auto whitespace-pre">{{ guideSnippets.structure }}</pre>
                    </p-accordion-content>
                </p-accordion-panel>

                <p-accordion-panel value="config">
                    <p-accordion-header>Config (Component Defaults)</p-accordion-header>
                    <p-accordion-content>
                        <pre class="text-sm bg-surface-100 dark:bg-surface-800 p-3 rounded-lg overflow-x-auto whitespace-pre">{{ guideSnippets.config }}</pre>
                    </p-accordion-content>
                </p-accordion-panel>

                @for (guide of componentGuides; track guide.type) {
                    <p-accordion-panel [value]="guide.type">
                        <p-accordion-header>{{ guide.label }}</p-accordion-header>
                        <p-accordion-content>
                            <p class="text-muted-color mb-2">{{ guide.description }}</p>
                            <table class="w-full text-sm mb-3">
                                <thead>
                                    <tr class="border-b border-surface-200 dark:border-surface-700">
                                        <th class="text-left py-1 pr-3 font-semibold">Prop</th>
                                        <th class="text-left py-1 pr-3 font-semibold">Type</th>
                                        <th class="text-left py-1 font-semibold">Default</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @for (prop of guide.props; track prop.name) {
                                        <tr class="border-b border-surface-100 dark:border-surface-800">
                                            <td class="py-1 pr-3 font-mono text-primary-500">{{ prop.name }}</td>
                                            <td class="py-1 pr-3">{{ prop.type }}</td>
                                            <td class="py-1">{{ prop.default }}</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <pre class="text-sm bg-surface-100 dark:bg-surface-800 p-3 rounded-lg overflow-x-auto whitespace-pre">{{ guide.example }}</pre>
                        </p-accordion-content>
                    </p-accordion-panel>
                }
            </p-accordion>
        </p-dialog>
    `
})
export class LayoutBuilder {
    builderService = inject(LayoutBuilderService);
    private layoutService = inject(LayoutService);
    private messageService = inject(MessageService);

    editorCode = signal<string>('');
    isDark = computed(() => this.layoutService.isDarkTheme());
    showGuide = signal(false);

    guideSnippets = {
        structure: `pages:
  - id: my-page        # unique page ID (required)
    title: My Page      # tab label (required)
    description: ...    # optional subtitle
    blocks:             # array of component blocks
      - type: message
        props:
          text: "Hello!"`,
        config: `# Set default props per component type.
# Blocks inherit these unless they override with own props.
config:
  button:
    severity: primary
    outlined: false
  table:
    paginator: true
    rows: 5
    stripedRows: true
  form:
    layout: vertical
  message:
    severity: info
  panel:
    toggleable: true
    collapsed: false`
    };

    componentGuides = [
        {
            type: 'message', label: 'Message', description: 'Displays an inline message/alert.',
            props: [
                { name: 'severity', type: 'string', default: 'info' },
                { name: 'text', type: 'string', default: '""' }
            ],
            example: `- type: message
  props:
    severity: success    # info | success | warn | error
    text: "Operation completed!"`
        },
        {
            type: 'button', label: 'Button', description: 'A clickable button.',
            props: [
                { name: 'label', type: 'string', default: '"Button"' },
                { name: 'icon', type: 'string', default: 'none' },
                { name: 'severity', type: 'string', default: 'primary' },
                { name: 'outlined', type: 'boolean', default: 'false' },
                { name: 'disabled', type: 'boolean', default: 'false' }
            ],
            example: `- type: button
  props:
    label: Save
    icon: pi pi-check
    severity: success    # primary | secondary | success | info | warn | danger | help
    outlined: true`
        },
        {
            type: 'divider', label: 'Divider', description: 'A horizontal or vertical separator line.',
            props: [
                { name: 'align', type: 'string', default: 'none' },
                { name: 'type', type: 'string', default: '"solid"' }
            ],
            example: `- type: divider
  props:
    align: center    # left | center | right
    type: dashed     # solid | dashed | dotted`
        },
        {
            type: 'card', label: 'Card', description: 'A container card. Supports nested blocks inside.',
            props: [
                { name: 'header', type: 'string', default: 'none' },
                { name: 'subheader', type: 'string', default: 'none' }
            ],
            example: `- type: card
  props:
    header: My Card
    subheader: Optional subtitle
  blocks:              # nested blocks rendered inside
    - type: message
      props:
        text: "Inside a card!"`
        },
        {
            type: 'panel', label: 'Panel', description: 'A collapsible panel. Supports nested blocks inside.',
            props: [
                { name: 'header', type: 'string', default: '"Panel"' },
                { name: 'toggleable', type: 'boolean', default: 'false' },
                { name: 'collapsed', type: 'boolean', default: 'false' }
            ],
            example: `- type: panel
  props:
    header: Details
    toggleable: true
    collapsed: false
  blocks:
    - type: message
      props:
        text: "Inside a panel!"`
        },
        {
            type: 'form', label: 'Form', description: 'A form with multiple field types. Fields are defined in the "fields" array.',
            props: [
                { name: 'layout', type: 'string', default: '"vertical"' }
            ],
            example: `- type: form
  props:
    layout: grid         # vertical | grid (2-column)
  fields:
    - name: username     # unique field name (required)
      label: Username    # display label (required)
      type: text         # text | number | textarea | checkbox | select | date
      placeholder: Enter username
      required: true
    - name: bio
      label: Biography
      type: textarea
      rows: 4            # textarea only
    - name: age
      label: Age
      type: number
    - name: role
      label: Role
      type: select
      options:           # select only
        - { label: Admin, value: admin }
        - { label: User, value: user }
    - name: active
      label: Active
      type: checkbox
    - name: birthdate
      label: Birth Date
      type: date`
        },
        {
            type: 'table', label: 'Table', description: 'A data table with columns and rows.',
            props: [
                { name: 'paginator', type: 'boolean', default: 'false' },
                { name: 'rows', type: 'number', default: '10' },
                { name: 'showGridlines', type: 'boolean', default: 'false' },
                { name: 'stripedRows', type: 'boolean', default: 'true' }
            ],
            example: `- type: table
  props:
    paginator: true
    rows: 5
    stripedRows: true
    showGridlines: false
  columns:
    - { field: id, header: ID }
    - { field: name, header: Name }
    - { field: status, header: Status }
  data:
    - { id: 1, name: Alice, status: Active }
    - { id: 2, name: Bob, status: Inactive }`
        }
    ];

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
