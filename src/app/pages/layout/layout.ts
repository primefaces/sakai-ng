import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MenuItem } from 'primeng/api';
import { ConfigService } from '../service/config.service';

interface EditableMenuItem {
    label: string;
    icon: string;
    routerLink?: string;
    items?: EditableMenuItem[];
}

const DEFAULT_MENU: EditableMenuItem[] = [
    {
        label: 'Home',
        icon: 'pi pi-home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: '/dashboard' },
            { label: 'Analytics', icon: 'pi pi-chart-line', routerLink: '/analytics' }
        ]
    },
    {
        label: 'Users',
        icon: 'pi pi-users',
        items: [
            { label: 'List', icon: 'pi pi-list', routerLink: '/users' },
            { label: 'Create', icon: 'pi pi-user-plus', routerLink: '/users/create' },
            { label: 'Roles', icon: 'pi pi-shield', routerLink: '/users/roles' }
        ]
    },
    {
        label: 'Content',
        icon: 'pi pi-file',
        items: [
            { label: 'Articles', icon: 'pi pi-file-edit', routerLink: '/content/articles' },
            { label: 'Media', icon: 'pi pi-images', routerLink: '/content/media' },
            { label: 'Categories', icon: 'pi pi-tags', routerLink: '/content/categories' }
        ]
    },
    {
        label: 'Settings',
        icon: 'pi pi-cog',
        items: [
            { label: 'General', icon: 'pi pi-sliders-h', routerLink: '/settings/general' },
            { label: 'Security', icon: 'pi pi-lock', routerLink: '/settings/security' },
            { label: 'Integrations', icon: 'pi pi-link', routerLink: '/settings/integrations' }
        ]
    }
];

@Component({
    selector: 'app-layout-showcase',
    standalone: true,
    imports: [
        CommonModule, FormsModule, DrawerModule, ToolbarModule, ButtonModule,
        PanelMenuModule, SelectButtonModule, AvatarModule, BadgeModule,
        InputTextModule, TextareaModule
    ],
    template: `
        <div class="flex flex-col h-screen bg-surface-0 dark:bg-surface-900">
            <!-- Topbar -->
            <p-toolbar styleClass="border-noround border-x-none border-top-none">
                <ng-template #start>
                    <p-button icon="pi pi-bars" [text]="true" (click)="leftVisible.set(!leftVisible())" />
                    <span class="font-semibold text-xl ml-2">Layout Showcase</span>
                </ng-template>
                <ng-template #center>
                    <p-selectbutton [options]="modeOptions" [ngModel]="mode()" (ngModelChange)="mode.set($event)" [allowEmpty]="false" />
                </ng-template>
                <ng-template #end>
                    <p-button [icon]="darkMode() ? 'pi pi-moon' : 'pi pi-sun'" [text]="true" (click)="toggleDarkMode()" />
                    <p-button icon="pi pi-sliders-h" [text]="true" (click)="rightVisible.set(!rightVisible())" />
                    <p-avatar icon="pi pi-user" shape="circle" />
                </ng-template>
            </p-toolbar>

            <!-- Body -->
            <div class="flex flex-1 overflow-hidden">
                <!-- Left Sidenav (static) -->
                @if (leftVisible()) {
                    <div class="w-72 border-r border-surface overflow-y-auto flex-shrink-0">
                        @if (mode() === 'demo') {
                            <p-panelmenu [model]="panelMenuItems()" [multiple]="true" styleClass="w-full border-none" />
                        } @else {
                            <!-- Config mode: inline editable menu -->
                            <div class="p-3 flex flex-col gap-1">
                                @for (group of menuItems(); track group.label; let gi = $index) {
                                    <div class="mb-2">
                                        @if (isEditing(gi, -1)) {
                                            <div class="flex flex-col gap-2 p-2 bg-surface-100 dark:bg-surface-800 rounded-border">
                                                <input pInputText [(ngModel)]="group.label" placeholder="Label" class="w-full text-sm" />
                                                <input pInputText [(ngModel)]="group.icon" placeholder="Icon (e.g. pi pi-home)" class="w-full text-sm" />
                                                <div class="flex gap-1">
                                                    <p-button icon="pi pi-check" size="small" severity="success" [text]="true" (click)="finishEdit()" />
                                                    <p-button icon="pi pi-trash" size="small" severity="danger" [text]="true" (click)="removeItem(gi)" />
                                                </div>
                                            </div>
                                        } @else {
                                            <div class="flex items-center justify-between p-2 rounded-border hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer group" (click)="startEdit(gi, -1)">
                                                <div class="flex items-center gap-2">
                                                    <i [class]="group.icon" class="text-muted-color"></i>
                                                    <span class="font-semibold text-sm">{{ group.label }}</span>
                                                </div>
                                                <i class="pi pi-pencil text-xs text-muted-color opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                            </div>
                                        }

                                        @if (group.items) {
                                            @for (item of group.items; track item.label; let ii = $index) {
                                                @if (isEditing(gi, ii)) {
                                                    <div class="flex flex-col gap-2 p-2 ml-4 bg-surface-100 dark:bg-surface-800 rounded-border">
                                                        <input pInputText [(ngModel)]="item.label" placeholder="Label" class="w-full text-sm" />
                                                        <input pInputText [(ngModel)]="item.icon" placeholder="Icon" class="w-full text-sm" />
                                                        <input pInputText [(ngModel)]="item.routerLink" placeholder="Route (e.g. /dashboard)" class="w-full text-sm" />
                                                        <div class="flex gap-1">
                                                            <p-button icon="pi pi-check" size="small" severity="success" [text]="true" (click)="finishEdit()" />
                                                            <p-button icon="pi pi-trash" size="small" severity="danger" [text]="true" (click)="removeSubItem(gi, ii)" />
                                                        </div>
                                                    </div>
                                                } @else {
                                                    <div class="flex items-center justify-between p-2 ml-4 rounded-border hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer group" (click)="startEdit(gi, ii)">
                                                        <div class="flex items-center gap-2">
                                                            <i [class]="item.icon" class="text-muted-color text-sm"></i>
                                                            <span class="text-sm">{{ item.label }}</span>
                                                        </div>
                                                        <i class="pi pi-pencil text-xs text-muted-color opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                                    </div>
                                                }
                                            }
                                            <div class="ml-4 mt-1">
                                                <p-button label="Add item" icon="pi pi-plus" size="small" [text]="true" (click)="addSubItem(gi)" />
                                            </div>
                                        }
                                    </div>
                                }
                                <p-button label="Add group" icon="pi pi-plus" severity="secondary" size="small" [text]="true" (click)="addGroup()" />
                            </div>
                        }
                    </div>
                }

                <!-- Main Container -->
                <div class="flex-1 overflow-y-auto p-6">
                    @if (mode() === 'demo') {
                        <!-- Demo content -->
                        <div class="grid grid-cols-12 gap-6">
                            @for (stat of stats; track stat.label) {
                                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                                    <div class="card mb-0">
                                        <div class="flex justify-between mb-4">
                                            <div>
                                                <span class="block text-muted-color font-medium mb-4">{{ stat.label }}</span>
                                                <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ stat.value }}</div>
                                            </div>
                                            <div class="flex items-center justify-center rounded-border" [ngClass]="stat.bgClass" style="width: 2.5rem; height: 2.5rem">
                                                <i [class]="stat.icon" [ngClass]="stat.iconClass" class="!text-xl"></i>
                                            </div>
                                        </div>
                                        <span class="text-primary font-medium">{{ stat.change }} </span>
                                        <span class="text-muted-color">{{ stat.period }}</span>
                                    </div>
                                </div>
                            }
                        </div>

                        <div class="card mt-6">
                            <div class="font-semibold text-xl mb-4">Main Content Area</div>
                            <p class="text-muted-color leading-normal">
                                This is a full-page layout showcase with its own topbar, left navigation sidenav, right settings drawer, main content area, and footer.
                                Switch to <strong>Config</strong> mode using the toggle in the topbar to customize the navigation menu items via code or visual editing.
                            </p>
                        </div>
                    } @else {
                        <!-- Config mode: live preview -->
                        <div class="card">
                            <div class="font-semibold text-xl mb-4">Live Preview</div>
                            <p class="text-muted-color mb-4">
                                Edit menu items by clicking them in the left sidenav, use the visual form in the right panel, or edit the JSON code directly.
                            </p>
                            <div class="border border-surface rounded-border p-4 bg-surface-50 dark:bg-surface-800">
                                <div class="font-medium mb-2">Current Menu Structure</div>
                                <pre class="text-sm text-muted-color overflow-x-auto m-0 whitespace-pre-wrap">{{ menuItemsPreview() }}</pre>
                            </div>
                        </div>
                    }
                </div>

                <!-- Right Sidenav (drawer) -->
                <p-drawer [(visible)]="rightVisible" header="{{ mode() === 'demo' ? 'Settings' : 'Menu Editor' }}" position="right" [modal]="false" [dismissible]="true" styleClass="w-96">
                    @if (mode() === 'demo') {
                        <div class="flex flex-col gap-4">
                            <div>
                                <div class="font-semibold mb-2">Notifications</div>
                                <div class="flex flex-col gap-3">
                                    @for (notification of notifications; track notification.id) {
                                        <div class="flex items-start gap-3 p-3 bg-surface-100 dark:bg-surface-800 rounded-border">
                                            <i [class]="notification.icon + ' text-xl'" [style.color]="notification.color"></i>
                                            <div>
                                                <div class="font-medium text-sm">{{ notification.title }}</div>
                                                <div class="text-muted-color text-xs mt-1">{{ notification.time }}</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div>
                                <div class="font-semibold mb-2">Quick Actions</div>
                                <div class="flex flex-col gap-2">
                                    <p-button label="New Project" icon="pi pi-plus" severity="success" styleClass="w-full" />
                                    <p-button label="Export Data" icon="pi pi-download" severity="info" styleClass="w-full" />
                                    <p-button label="View Reports" icon="pi pi-chart-bar" severity="warn" styleClass="w-full" />
                                </div>
                            </div>

                            <div>
                                <div class="font-semibold mb-2">Activity</div>
                                <div class="flex flex-col gap-2 text-sm text-muted-color">
                                    <div class="flex items-center gap-2">
                                        <i class="pi pi-circle-fill text-green-500 text-xs"></i>
                                        <span>System updated successfully</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <i class="pi pi-circle-fill text-blue-500 text-xs"></i>
                                        <span>New user registered</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <i class="pi pi-circle-fill text-orange-500 text-xs"></i>
                                        <span>Server maintenance scheduled</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    } @else {
                        <div class="flex flex-col gap-4">
                            <!-- Visual editor form -->
                            <div>
                                <div class="font-semibold mb-2">Add Menu Group</div>
                                <div class="flex flex-col gap-2">
                                    <input pInputText [(ngModel)]="newGroupLabel" placeholder="Group label" class="w-full" />
                                    <input pInputText [(ngModel)]="newGroupIcon" placeholder="Icon (e.g. pi pi-folder)" class="w-full" />
                                    <p-button label="Add Group" icon="pi pi-plus" (click)="addGroupFromForm()" styleClass="w-full" [disabled]="!newGroupLabel" />
                                </div>
                            </div>

                            <div>
                                <div class="font-semibold mb-2">Add Menu Item</div>
                                <div class="flex flex-col gap-2">
                                    <select class="p-inputtext w-full" [(ngModel)]="newItemParentIndex">
                                        <option [ngValue]="-1" disabled>Select parent group...</option>
                                        @for (group of menuItems(); track group.label; let i = $index) {
                                            <option [ngValue]="i">{{ group.label }}</option>
                                        }
                                    </select>
                                    <input pInputText [(ngModel)]="newItemLabel" placeholder="Item label" class="w-full" />
                                    <input pInputText [(ngModel)]="newItemIcon" placeholder="Icon (e.g. pi pi-home)" class="w-full" />
                                    <input pInputText [(ngModel)]="newItemRoute" placeholder="Route (e.g. /dashboard)" class="w-full" />
                                    <p-button label="Add Item" icon="pi pi-plus" (click)="addItemFromForm()" styleClass="w-full" [disabled]="!newItemLabel || newItemParentIndex === -1" />
                                </div>
                            </div>

                            <!-- Reorder groups -->
                            <div>
                                <div class="font-semibold mb-2">Reorder Groups</div>
                                <div class="flex flex-col gap-1">
                                    @for (group of menuItems(); track group.label; let i = $index) {
                                        <div class="flex items-center justify-between p-2 bg-surface-100 dark:bg-surface-800 rounded-border">
                                            <div class="flex items-center gap-2">
                                                <i [class]="group.icon" class="text-muted-color"></i>
                                                <span class="text-sm">{{ group.label }}</span>
                                            </div>
                                            <div class="flex gap-1">
                                                <p-button icon="pi pi-arrow-up" size="small" [text]="true" [disabled]="i === 0" (click)="moveGroup(i, -1)" />
                                                <p-button icon="pi pi-arrow-down" size="small" [text]="true" [disabled]="i === menuItems().length - 1" (click)="moveGroup(i, 1)" />
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                            <!-- Code editor -->
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <div class="font-semibold">Code Editor (JSON)</div>
                                    <p-button label="Apply" icon="pi pi-check" size="small" severity="success" (click)="applyJson()" />
                                </div>
                                @if (jsonError()) {
                                    <div class="text-red-500 text-xs mb-2">{{ jsonError() }}</div>
                                }
                                <textarea pTextarea [(ngModel)]="menuJson" [rows]="12" class="w-full font-mono text-xs" (ngModelChange)="onJsonInput()"></textarea>
                            </div>
                        </div>
                    }
                </p-drawer>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between px-6 py-4 border-t border-surface flex-shrink-0">
                <span class="text-muted-color text-sm">&copy; 2026 Layout Showcase. All rights reserved.</span>
                <div class="flex gap-4">
                    <a class="text-muted-color hover:text-primary cursor-pointer text-sm">Privacy Policy</a>
                    <a class="text-muted-color hover:text-primary cursor-pointer text-sm">Terms of Service</a>
                    <a class="text-muted-color hover:text-primary cursor-pointer text-sm">Contact</a>
                </div>
            </div>
        </div>
    `
})
export class Layout {
    mode = signal<'demo' | 'config'>('demo');
    leftVisible = signal(true);
    rightVisible = signal(false);
    darkMode = signal(false);

    menuItems = signal<EditableMenuItem[]>([]);
    menuJson = signal('');
    jsonError = signal<string | null>(null);

    editingGroup = signal(-1);
    editingItem = signal(-1);

    // Form fields for adding items
    newGroupLabel = '';
    newGroupIcon = 'pi pi-folder';
    newItemParentIndex = -1;
    newItemLabel = '';
    newItemIcon = 'pi pi-circle';
    newItemRoute = '';

    modeOptions = [
        { label: 'Demo', value: 'demo' },
        { label: 'Config', value: 'config' }
    ];

    stats = [
        { label: 'Orders', value: '152', icon: 'pi pi-shopping-cart', iconClass: 'text-blue-500', bgClass: 'bg-blue-100 dark:bg-blue-400/10', change: '24 new', period: 'since last visit' },
        { label: 'Revenue', value: '$2,100', icon: 'pi pi-dollar', iconClass: 'text-orange-500', bgClass: 'bg-orange-100 dark:bg-orange-400/10', change: '%52+', period: 'since last week' },
        { label: 'Customers', value: '28,441', icon: 'pi pi-users', iconClass: 'text-cyan-500', bgClass: 'bg-cyan-100 dark:bg-cyan-400/10', change: '520', period: 'newly registered' },
        { label: 'Comments', value: '152 Unread', icon: 'pi pi-comment', iconClass: 'text-purple-500', bgClass: 'bg-purple-100 dark:bg-purple-400/10', change: '85', period: 'responded' }
    ];

    notifications = [
        { id: 1, icon: 'pi pi-envelope', color: '#3B82F6', title: 'New message from admin', time: '2 min ago' },
        { id: 2, icon: 'pi pi-shopping-cart', color: '#F59E0B', title: 'Order #1234 completed', time: '15 min ago' },
        { id: 3, icon: 'pi pi-exclamation-triangle', color: '#EF4444', title: 'Server alert detected', time: '1 hour ago' },
        { id: 4, icon: 'pi pi-user', color: '#10B981', title: 'New user registered', time: '3 hours ago' }
    ];

    panelMenuItems = computed(() => {
        return this.menuItems().map(group => ({
            label: group.label,
            icon: group.icon,
            items: group.items?.map(item => ({
                label: item.label,
                icon: item.icon,
                routerLink: item.routerLink ? [item.routerLink] : undefined
            }))
        })) as MenuItem[];
    });

    menuItemsPreview = computed(() => JSON.stringify(this.menuItems(), null, 2));

    constructor(private configService: ConfigService) {
        // Load menu from config service
        const configMenu = this.configService.getShowcaseMenuConfig();
        this.menuItems.set(structuredClone(configMenu as any));
        this.menuJson.set(JSON.stringify(configMenu, null, 2));

        // Watch for changes in config service and update menu
        effect(() => {
            const menu = this.configService.showcaseMenuConfig();
            this.menuItems.set(structuredClone(menu as any));
            this.menuJson.set(JSON.stringify(menu, null, 2));
        });

        this.darkMode.set(document.documentElement.classList.contains('app-dark'));
    }

    toggleDarkMode() {
        this.darkMode.update(v => !v);
        document.documentElement.classList.toggle('app-dark');
    }

    // Inline editing
    isEditing(groupIndex: number, itemIndex: number): boolean {
        return this.editingGroup() === groupIndex && this.editingItem() === itemIndex;
    }

    startEdit(groupIndex: number, itemIndex: number) {
        this.editingGroup.set(groupIndex);
        this.editingItem.set(itemIndex);
    }

    finishEdit() {
        this.editingGroup.set(-1);
        this.editingItem.set(-1);
        this.syncJsonFromItems();
    }

    removeItem(groupIndex: number) {
        this.menuItems.update(items => {
            const updated = [...items];
            updated.splice(groupIndex, 1);
            return updated;
        });
        this.finishEdit();
    }

    removeSubItem(groupIndex: number, itemIndex: number) {
        this.menuItems.update(items => {
            const updated = structuredClone(items);
            updated[groupIndex].items?.splice(itemIndex, 1);
            return updated;
        });
        this.finishEdit();
    }

    addSubItem(groupIndex: number) {
        this.menuItems.update(items => {
            const updated = structuredClone(items);
            if (!updated[groupIndex].items) {
                updated[groupIndex].items = [];
            }
            updated[groupIndex].items!.push({ label: 'New Item', icon: 'pi pi-circle', routerLink: '/' });
            return updated;
        });
        const group = this.menuItems()[groupIndex];
        this.startEdit(groupIndex, group.items!.length - 1);
    }

    addGroup() {
        this.menuItems.update(items => [...items, { label: 'New Group', icon: 'pi pi-folder', items: [] }]);
        this.startEdit(this.menuItems().length - 1, -1);
    }

    // Form-based adding
    addGroupFromForm() {
        if (!this.newGroupLabel) return;
        this.menuItems.update(items => [...items, { label: this.newGroupLabel, icon: this.newGroupIcon, items: [] }]);
        this.newGroupLabel = '';
        this.newGroupIcon = 'pi pi-folder';
        this.syncJsonFromItems();
    }

    addItemFromForm() {
        if (!this.newItemLabel || this.newItemParentIndex === -1) return;
        this.menuItems.update(items => {
            const updated = structuredClone(items);
            if (!updated[this.newItemParentIndex].items) {
                updated[this.newItemParentIndex].items = [];
            }
            updated[this.newItemParentIndex].items!.push({
                label: this.newItemLabel,
                icon: this.newItemIcon,
                routerLink: this.newItemRoute || undefined
            });
            return updated;
        });
        this.newItemLabel = '';
        this.newItemIcon = 'pi pi-circle';
        this.newItemRoute = '';
        this.syncJsonFromItems();
    }

    // Reorder
    moveGroup(index: number, direction: number) {
        this.menuItems.update(items => {
            const updated = [...items];
            const target = index + direction;
            [updated[index], updated[target]] = [updated[target], updated[index]];
            return updated;
        });
        this.syncJsonFromItems();
    }

    // JSON sync
    syncJsonFromItems() {
        this.menuJson.set(JSON.stringify(this.menuItems(), null, 2));
        this.jsonError.set(null);
        // Save to config service
        this.configService.updateShowcaseMenuConfig(this.menuItems() as any);
    }

    onJsonInput() {
        this.jsonError.set(null);
    }

    applyJson() {
        try {
            const parsed = JSON.parse(this.menuJson());
            if (!Array.isArray(parsed)) {
                this.jsonError.set('JSON must be an array of menu groups');
                return;
            }
            this.menuItems.set(parsed);
            this.jsonError.set(null);
            // Save to config service
            this.configService.updateShowcaseMenuConfig(parsed);
        } catch (e: any) {
            this.jsonError.set('Invalid JSON: ' + e.message);
        }
    }
}
