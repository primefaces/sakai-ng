import { Injectable, signal } from '@angular/core';
import * as yaml from 'js-yaml';

export interface BlockConfig {
    type: string;
    props?: Record<string, any>;
    blocks?: BlockConfig[];
    fields?: FieldConfig[];
    columns?: ColumnConfig[];
    data?: any[];
}

export interface FieldConfig {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    defaultValue?: any;
    rows?: number;
    options?: { label: string; value: any }[];
}

export interface ColumnConfig {
    field: string;
    header: string;
}

export interface PageConfig {
    id: string;
    title: string;
    path?: string;
    description?: string;
    blocks: BlockConfig[];
}

export interface ComponentDefaults {
    [componentType: string]: Record<string, any>;
}

export interface LayoutBuilderConfig {
    config?: ComponentDefaults;
    pages: PageConfig[];
}

const STORAGE_KEY = 'layout-builder-config';

const DEFAULT_YAML = `# Default config per component type.
# Each block inherits these unless it overrides with its own props.
config:
  button:
    severity: primary
    outlined: false
  table:
    paginator: true
    rows: 5
    stripedRows: true
    showGridlines: false
  form:
    layout: vertical
  message:
    severity: info
  panel:
    toggleable: true
    collapsed: false

pages:
  - id: welcome
    title: Welcome
    description: Getting started with Layout Builder
    blocks:
      - type: message
        props:
          text: "Edit the YAML on the left to see changes here!"

      - type: card
        props:
          header: Sample Form
        blocks:
          - type: form
            fields:
              - name: username
                label: Username
                type: text
                placeholder: Enter username
              - name: email
                label: Email
                type: text
                placeholder: Enter email
              - name: role
                label: Role
                type: select
                options:
                  - { label: Admin, value: admin }
                  - { label: User, value: user }
                  - { label: Guest, value: guest }
              - name: active
                label: Active
                type: checkbox
              - name: birthdate
                label: Birth Date
                type: date

          - type: button
            props:
              label: Submit
              icon: pi pi-check

      - type: divider

      - type: panel
        props:
          header: Data Table
        blocks:
          - type: table
            columns:
              - { field: id, header: ID }
              - { field: name, header: Name }
              - { field: status, header: Status }
            data:
              - { id: 1, name: Alice, status: Active }
              - { id: 2, name: Bob, status: Inactive }
              - { id: 3, name: Charlie, status: Active }
              - { id: 4, name: Diana, status: Active }
              - { id: 5, name: Eve, status: Inactive }
              - { id: 6, name: Frank, status: Active }

  - id: dashboard
    title: Dashboard
    description: Sample dashboard page
    blocks:
      - type: message
        props:
          severity: success
          text: "Welcome to the dashboard!"

      - type: card
        props:
          header: Quick Stats
        blocks:
          - type: table
            columns:
              - { field: metric, header: Metric }
              - { field: value, header: Value }
              - { field: change, header: Change }
            data:
              - { metric: Users, value: "1,234", change: "+12%" }
              - { metric: Revenue, value: "$5,678", change: "+8%" }
              - { metric: Orders, value: "456", change: "-3%" }

      - type: button
        props:
          label: Export Report
          icon: pi pi-download
          severity: secondary
          outlined: true
`;

@Injectable({
    providedIn: 'root'
})
export class LayoutBuilderService {
    yamlCode = signal<string>('');
    errors = signal<string[]>([]);
    selectedPageId = signal<string>('');
    parsedConfig = signal<LayoutBuilderConfig | null>(null);
    pages = signal<PageConfig[]>([]);
    componentDefaults = signal<ComponentDefaults>({});

    constructor() {
        this.load();
        this.parse();
    }

    private parse(): void {
        const code = this.yamlCode();
        if (!code.trim()) {
            this.parsedConfig.set(null);
            this.pages.set([]);
            this.componentDefaults.set({});
            this.errors.set([]);
            return;
        }
        try {
            const parsed = yaml.load(code) as any;
            const validationErrors = this.validate(parsed);
            if (validationErrors.length > 0) {
                this.errors.set(validationErrors);
                this.parsedConfig.set(null);
                this.pages.set([]);
                this.componentDefaults.set({});
                return;
            }
            this.errors.set([]);
            const config = parsed as LayoutBuilderConfig;
            this.parsedConfig.set(config);
            this.pages.set(config.pages ?? []);
            this.componentDefaults.set(config.config ?? {});
        } catch (e) {
            this.errors.set([(e as Error).message]);
            this.parsedConfig.set(null);
            this.pages.set([]);
            this.componentDefaults.set({});
        }
    }

    private validate(config: any): string[] {
        const errors: string[] = [];
        if (!config || typeof config !== 'object') {
            errors.push('Configuration must be a YAML object');
            return errors;
        }
        if (!Array.isArray(config.pages)) {
            errors.push('"pages" must be an array');
            return errors;
        }
        config.pages.forEach((page: any, i: number) => {
            if (!page.id) errors.push(`Page ${i + 1}: missing "id"`);
            if (!page.title) errors.push(`Page ${i + 1}: missing "title"`);
            if (!Array.isArray(page.blocks)) errors.push(`Page ${i + 1}: "blocks" must be an array`);
        });
        return errors;
    }

    load(): void {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            this.yamlCode.set(stored || DEFAULT_YAML);
        } catch {
            this.yamlCode.set(DEFAULT_YAML);
        }
    }

    save(): void {
        try {
            localStorage.setItem(STORAGE_KEY, this.yamlCode());
        } catch (e) {
            console.error('Failed to save layout builder config', e);
        }
    }

    applyYaml(code: string): boolean {
        this.yamlCode.set(code);
        this.parse();
        if (this.parsedConfig()) {
            this.save();
            return true;
        }
        return false;
    }

    exportAsJson(): string {
        const config = this.parsedConfig();
        return config ? JSON.stringify(config, null, 2) : '';
    }

    reset(): void {
        this.yamlCode.set(DEFAULT_YAML);
        this.parse();
        this.save();
    }
}
