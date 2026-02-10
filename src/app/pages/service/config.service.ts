import { Injectable, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as yaml from 'js-yaml';

export interface ConfigState {
    showcaseMenu: MenuItem[];  // Menu for showcase demos, not the main app menu
    // Placeholder for future configs
    theme?: {
        primaryColor?: string;
        darkMode?: boolean;
    };
    notifications?: {
        enabled?: boolean;
        sound?: boolean;
    };
    dashboard?: {
        widgets?: string[];
        refreshInterval?: number;
    };
}

// Default menu configuration for showcase demos (not the main app menu)
const DEFAULT_SHOWCASE_MENU_CONFIG: MenuItem[] = [
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
            { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
            { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
            { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
            { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
            { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
        ]
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                routerLink: ['/landing']
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        routerLink: ['/auth/login']
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        routerLink: ['/auth/error']
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['/auth/access']
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/pages/crud']
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                routerLink: ['/pages/notfound']
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                routerLink: ['/pages/empty']
            },
            {
                label: 'Layout',
                icon: 'pi pi-fw pi-objects-column',
                routerLink: ['/layout']
            }
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-book',
                routerLink: ['/documentation']
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-github',
                url: 'https://github.com/primefaces/sakai-ng',
                target: '_blank'
            }
        ]
    }
];

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private configState = signal<ConfigState>({
        showcaseMenu: []
    });

    // Public signals
    showcaseMenuConfig = signal<MenuItem[]>([]);

    constructor() {
        // Load config from localStorage on initialization
        this.loadConfig();
    }

    private loadShowcaseMenuConfig(): MenuItem[] {
        const stored = localStorage.getItem('demo-showcase-menu-config');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse showcase menu config from localStorage', e);
            }
        }
        return [...DEFAULT_SHOWCASE_MENU_CONFIG];
    }

    private loadConfig(): void {
        const stored = localStorage.getItem('demo-config');
        let config: ConfigState;
        
        if (stored) {
            try {
                config = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse config from localStorage', e);
                config = {
                    showcaseMenu: [...DEFAULT_SHOWCASE_MENU_CONFIG]
                };
            }
        } else {
            // Initialize with defaults if no stored config
            config = {
                showcaseMenu: [...DEFAULT_SHOWCASE_MENU_CONFIG]
            };
        }
        
        this.configState.set(config);
        this.showcaseMenuConfig.set(config.showcaseMenu);
        
        // Save to localStorage if it was empty
        if (!stored) {
            this.saveConfig();
        }
    }

    private saveConfig(): void {
        const config = this.configState();
        console.log('Saving config to localStorage:', config);
        localStorage.setItem('demo-config', JSON.stringify(config));
        localStorage.setItem('demo-showcase-menu-config', JSON.stringify(config.showcaseMenu));
        console.log('Config saved successfully');
    }

    getConfig(): ConfigState {
        return this.configState();
    }

    getShowcaseMenuConfig(): MenuItem[] {
        return this.showcaseMenuConfig();
    }

    updateShowcaseMenuConfig(menu: MenuItem[]): void {
        this.configState.update(state => ({ ...state, showcaseMenu: menu }));
        this.showcaseMenuConfig.set(menu);
        this.saveConfig();
    }

    resetShowcaseMenuConfig(): void {
        const defaultMenu = [...DEFAULT_SHOWCASE_MENU_CONFIG];
        this.updateShowcaseMenuConfig(defaultMenu);
    }
    
    updateConfig(config: Partial<ConfigState>): void {
        this.configState.update(state => ({ ...state, ...config }));
        if (config.showcaseMenu) {
            this.showcaseMenuConfig.set(config.showcaseMenu);
        }
        this.saveConfig();
    }
    
    resetConfig(): void {
        const defaultConfig: ConfigState = {
            showcaseMenu: [...DEFAULT_SHOWCASE_MENU_CONFIG]
        };
        this.configState.set(defaultConfig);
        this.showcaseMenuConfig.set(defaultConfig.showcaseMenu);
        this.saveConfig();
    }

    exportConfigAsYaml(): string {
        const config = this.configState();
        try {
            return yaml.dump(config, { indent: 2, lineWidth: -1 });
        } catch (e) {
            console.error('Failed to export YAML:', e);
            return '';
        }
    }

    importConfigFromYaml(yamlString: string): void {
        try {
            const config = yaml.load(yamlString) as ConfigState;
            if (!config || typeof config !== 'object') {
                throw new Error('Invalid YAML structure');
            }
            this.configState.set(config);
            if (config.showcaseMenu) {
                this.showcaseMenuConfig.set(config.showcaseMenu);
            }
            this.saveConfig();
        } catch (e) {
            throw new Error('Failed to parse YAML: ' + (e as Error).message);
        }
    }
    
    exportConfigAsJson(): string {
        return JSON.stringify(this.configState(), null, 2);
    }
    
    importConfigFromJson(json: string): void {
        try {
            const config = JSON.parse(json);
            this.configState.set(config);
            if (config.showcaseMenu) {
                this.showcaseMenuConfig.set(config.showcaseMenu);
            }
            this.saveConfig();
        } catch (e) {
            throw new Error('Failed to parse JSON: ' + (e as Error).message);
        }
    }
}
