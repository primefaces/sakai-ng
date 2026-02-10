import { Component, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import { SelectButtonModule } from 'primeng/selectbutton';
import { LayoutService } from '@/app/layout/service/layout.service';
import { $t, updatePreset, updateSurfacePalette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { PrimeNG } from 'primeng/config';

const presets = {
    Aura,
    Lara,
    Nora
} as const;

declare type KeyOfType<T> = keyof T extends infer U ? U : never;

declare type SurfacesType = {
    name?: string;
    palette?: {
        0?: string;
        50?: string;
        100?: string;
        200?: string;
        300?: string;
        400?: string;
        500?: string;
        600?: string;
        700?: string;
        800?: string;
        900?: string;
        950?: string;
    };
};

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
        DividerModule,
        SelectButtonModule
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

                    <!-- Theme Configuration Tab -->
                    <p-tabpanel value="1">
                        <div class="flex flex-col gap-4">
                            <p-message severity="info" text="Configure application theme settings including dark mode, colors, and presets." />
                            
                            <div class="card">
                                <h3 class="font-semibold text-xl mb-3">Dark Mode</h3>
                                <div class="flex items-center gap-3">
                                    <p-toggleButton
                                        [ngModel]="themeConfig().darkMode"
                                        (ngModelChange)="updateDarkMode($event)"
                                        onLabel="Dark"
                                        offLabel="Light"
                                        onIcon="pi pi-moon"
                                        offIcon="pi pi-sun"
                                    />
                                    <span class="text-muted-color">Toggle between light and dark themes</span>
                                </div>
                            </div>

                            <div class="card">
                                <h3 class="font-semibold text-xl mb-3">Primary Color</h3>
                                <div class="pt-2 flex gap-2 flex-wrap justify-start">
                                    @for (primaryColor of primaryColors(); track primaryColor.name) {
                                        <button
                                            type="button"
                                            [title]="primaryColor.name"
                                            (click)="updateColors($event, 'primary', primaryColor)"
                                            [ngClass]="{
                                                'outline outline-primary': primaryColor.name === selectedPrimaryColor()
                                            }"
                                            class="cursor-pointer w-8 h-8 rounded-full flex shrink-0 items-center justify-center outline-offset-1 shadow"
                                            [style]="{
                                                'background-color': primaryColor?.name === 'noir' ? 'var(--text-color)' : primaryColor?.palette?.['500']
                                            }"
                                        >
                                        </button>
                                    }
                                </div>
                            </div>

                            <div class="card">
                                <h3 class="font-semibold text-xl mb-3">Surface Color</h3>
                                <div class="pt-2 flex gap-2 flex-wrap justify-start">
                                    @for (surface of surfaces; track surface.name) {
                                        <button
                                            type="button"
                                            [title]="surface.name"
                                            (click)="updateColors($event, 'surface', surface)"
                                            class="cursor-pointer w-8 h-8 rounded-full flex shrink-0 items-center justify-center p-0 outline-offset-1 shadow"
                                            [ngClass]="{
                                                'outline outline-primary': selectedSurfaceColor() ? selectedSurfaceColor() === surface.name : layoutService.layoutConfig().darkTheme ? surface.name === 'zinc' : surface.name === 'slate'
                                            }"
                                            [style]="{
                                                'background-color': surface?.palette?.['500']
                                            }"
                                        ></button>
                                    }
                                </div>
                            </div>

                            <div class="card">
                                <h3 class="font-semibold text-xl mb-3">Preset</h3>
                                <p-selectbutton [options]="presets" [ngModel]="selectedPreset()" (ngModelChange)="onPresetChange($event)" [allowEmpty]="false" />
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
    themeConfig = signal({
        darkMode: false,
        primaryColor: 'emerald',
        surfaceColor: 'slate',
        preset: 'Aura'
    });

    layoutService = inject(LayoutService);
    platformId = inject(PLATFORM_ID);
    primeng = inject(PrimeNG);

    presets = Object.keys(presets);

    surfaces: SurfacesType[] = [
        { name: 'slate', palette: { 0: '#ffffff', 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' } },
        { name: 'gray', palette: { 0: '#ffffff', 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712' } },
        { name: 'zinc', palette: { 0: '#ffffff', 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' } },
        { name: 'neutral', palette: { 0: '#ffffff', 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' } },
        { name: 'stone', palette: { 0: '#ffffff', 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09' } },
        { name: 'soho', palette: { 0: '#ffffff', 50: '#ececec', 100: '#dedfdf', 200: '#c4c4c6', 300: '#adaeb0', 400: '#97979b', 500: '#7f8084', 600: '#6a6b70', 700: '#55565b', 800: '#3f4046', 900: '#2c2c34', 950: '#16161d' } },
        { name: 'viva', palette: { 0: '#ffffff', 50: '#f3f3f3', 100: '#e7e7e8', 200: '#cfd0d0', 300: '#b7b8b9', 400: '#9fa1a1', 500: '#87898a', 600: '#6e7173', 700: '#565a5b', 800: '#3e4244', 900: '#262b2c', 950: '#0e1315' } },
        { name: 'ocean', palette: { 0: '#ffffff', 50: '#fbfcfc', 100: '#F7F9F8', 200: '#EFF3F2', 300: '#DADEDD', 400: '#B1B7B6', 500: '#828787', 600: '#5F7274', 700: '#415B61', 800: '#29444E', 900: '#183240', 950: '#0c1920' } }
    ];

    selectedPrimaryColor = computed(() => this.layoutService.layoutConfig().primary);
    selectedSurfaceColor = computed(() => this.layoutService.layoutConfig().surface);
    selectedPreset = computed(() => this.layoutService.layoutConfig().preset);

    primaryColors = computed<SurfacesType[]>(() => {
        const presetPalette = presets[this.layoutService.layoutConfig().preset as KeyOfType<typeof presets>].primitive;
        const colors = ['emerald', 'green', 'lime', 'orange', 'amber', 'yellow', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
        const palettes: SurfacesType[] = [{ name: 'noir', palette: {} }];
        colors.forEach((color) => {
            palettes.push({
                name: color,
                palette: presetPalette?.[color as KeyOfType<typeof presetPalette>] as SurfacesType['palette']
            });
        });
        return palettes;
    });

    constructor(
        private configService: ConfigService,
        private messageService: MessageService
    ) {
        this.reloadConfigCode();
        this.loadThemeConfig();
        console.log('Config component initialized, code length:', this.configCode().length);
        
        if (isPlatformBrowser(this.platformId)) {
            // Load and apply saved theme on initialization
            const savedTheme = this.configService.getThemeConfig();
            this.layoutService.layoutConfig.update(state => ({
                ...state,
                darkTheme: savedTheme.darkMode,
                primary: savedTheme.primaryColor,
                surface: savedTheme.surfaceColor,
                preset: savedTheme.preset
            }));
            this.onPresetChange(savedTheme.preset);
        }
    }

    ngOnInit() {
    }

    loadThemeConfig() {
        const theme = this.configService.getThemeConfig();
        this.themeConfig.set(theme);
    }

    updateDarkMode(darkMode: boolean) {
        this.configService.updateThemeConfig({ darkMode });
        this.themeConfig.update(config => ({ ...config, darkMode }));
        
        // Update LayoutService
        this.layoutService.layoutConfig.update(state => ({
            ...state,
            darkTheme: darkMode
        }));
        
        this.messageService.add({
            severity: 'success',
            summary: 'Theme Updated',
            detail: `Switched to ${darkMode ? 'dark' : 'light'} mode`
        });
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

    getPresetExt() {
        const color: SurfacesType = this.primaryColors().find((c) => c.name === this.selectedPrimaryColor()) || {};
        const preset = this.layoutService.layoutConfig().preset;

        if (color.name === 'noir') {
            return {
                semantic: {
                    primary: { 50: '{surface.50}', 100: '{surface.100}', 200: '{surface.200}', 300: '{surface.300}', 400: '{surface.400}', 500: '{surface.500}', 600: '{surface.600}', 700: '{surface.700}', 800: '{surface.800}', 900: '{surface.900}', 950: '{surface.950}' },
                    colorScheme: {
                        light: { primary: { color: '{primary.950}', contrastColor: '#ffffff', hoverColor: '{primary.800}', activeColor: '{primary.700}' }, highlight: { background: '{primary.950}', focusBackground: '{primary.700}', color: '#ffffff', focusColor: '#ffffff' } },
                        dark: { primary: { color: '{primary.50}', contrastColor: '{primary.950}', hoverColor: '{primary.200}', activeColor: '{primary.300}' }, highlight: { background: '{primary.50}', focusBackground: '{primary.300}', color: '{primary.950}', focusColor: '{primary.950}' } }
                    }
                }
            };
        } else {
            if (preset === 'Nora') {
                return {
                    semantic: {
                        primary: color.palette,
                        colorScheme: {
                            light: { primary: { color: '{primary.600}', contrastColor: '#ffffff', hoverColor: '{primary.700}', activeColor: '{primary.800}' }, highlight: { background: '{primary.600}', focusBackground: '{primary.700}', color: '#ffffff', focusColor: '#ffffff' } },
                            dark: { primary: { color: '{primary.500}', contrastColor: '{surface.900}', hoverColor: '{primary.400}', activeColor: '{primary.300}' }, highlight: { background: '{primary.500}', focusBackground: '{primary.400}', color: '{surface.900}', focusColor: '{surface.900}' } }
                        }
                    }
                };
            } else {
                return {
                    semantic: {
                        primary: color.palette,
                        colorScheme: {
                            light: { primary: { color: '{primary.500}', contrastColor: '#ffffff', hoverColor: '{primary.600}', activeColor: '{primary.700}' }, highlight: { background: '{primary.50}', focusBackground: '{primary.100}', color: '{primary.700}', focusColor: '{primary.800}' } },
                            dark: { primary: { color: '{primary.400}', contrastColor: '{surface.900}', hoverColor: '{primary.300}', activeColor: '{primary.200}' }, highlight: { background: 'color-mix(in srgb, {primary.400}, transparent 84%)', focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)', color: 'rgba(255,255,255,.87)', focusColor: 'rgba(255,255,255,.87)' } }
                        }
                    }
                };
            }
        }
    }

    updateColors(event: any, type: string, color: any) {
        if (type === 'primary') {
            this.layoutService.layoutConfig.update((state) => ({ ...state, primary: color.name }));
            this.configService.updateThemeConfig({ primaryColor: color.name });
        } else if (type === 'surface') {
            this.layoutService.layoutConfig.update((state) => ({ ...state, surface: color.name }));
            this.configService.updateThemeConfig({ surfaceColor: color.name });
        }
        this.applyTheme(type, color);
        event.stopPropagation();
    }

    applyTheme(type: string, color: any) {
        if (type === 'primary') {
            updatePreset(this.getPresetExt());
        } else if (type === 'surface') {
            updateSurfacePalette(color.palette);
        }
    }

    onPresetChange(event: any) {
        this.layoutService.layoutConfig.update((state) => ({ ...state, preset: event }));
        this.configService.updateThemeConfig({ preset: event });
        const preset = presets[event as KeyOfType<typeof presets>];
        const surfacePalette = this.surfaces.find((s) => s.name === this.selectedSurfaceColor())?.palette;
        $t().preset(preset).preset(this.getPresetExt()).surfacePalette(surfacePalette).use({ useDefaultOptions: true });
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
