import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, DividerModule],
    template: `
    <div class="menu-header">
        <i class="pi pi-compass header-icon"></i>
        <h3>NAVIGATION</h3>
    </div>
    <ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator">
                <p-divider></p-divider>
            </li>
        </ng-container>
    </ul>`,
    styles: [`
        .menu-header {
            padding: 1.5rem;
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-400) 100%);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            border-radius: var(--content-border-radius);
        }

        .header-icon {
            font-size: 1.5rem;
            color: var(--primary-contrast-color);
        }

        .menu-header h3 {
            margin: 0;
            color: var(--primary-contrast-color);
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: 1.5px;
        }

        :host ::ng-deep .layout-menu {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        :host ::ng-deep .layout-menu .layout-menuitem-root-text {
            color: var(--text-color-secondary);
            font-weight: 600;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 0.75rem 1rem 0.5rem 1rem;
            display: block;
        }

        :host ::ng-deep .layout-menu .layout-root-menuitem > .layout-menuitem-root-text {
            margin-top: 1rem;
        }

        :host ::ng-deep .layout-menu .layout-root-menuitem:first-child > .layout-menuitem-root-text {
            margin-top: 0;
        }

        .menu-separator {
            margin: 1rem 0;
        }
    `]
})
export class AppMenu {
    private router = inject(Router);

    model: MenuItem[] = [];

    dashboardMenu = [
        { label: 'Overview', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
    ];

    marketsMenu = [
        { label: 'Find Markets', icon: 'pi pi-fw pi-search', routerLink: ['/markets'] },
        { label: 'MGA Guidelines', icon: 'pi pi-fw pi-list', routerLink: ['/mga'] }
    ];

    quotesMenu = [
        { label: 'My Quotes', icon: 'pi pi-fw pi-list', routerLink: ['/quotes'] },
        { label: 'New Quote (Workbench)', icon: 'pi pi-fw pi-plus', routerLink: ['/underwriting'] }
    ];

    ngOnInit() {
        // Initial check
        this.updateMenu(this.router.url);

        // Listen for route changes
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateMenu(event.urlAfterRedirects || event.url);
            }
        });
    }

    updateMenu(url: string) {
        if (url.includes('/markets') || url.includes('/mga')) {
            this.model = this.marketsMenu;
        } else if (url.includes('/quotes') || url.includes('/underwriting')) {
            this.model = this.quotesMenu;
        } else {
            // Default to Dashboard
            this.model = this.dashboardMenu;
        }
    }
}
