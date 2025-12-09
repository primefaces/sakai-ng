import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/layout.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, ButtonModule, AvatarModule, MenuModule],
    template: ` 
    <div class="layout-topbar">
        <!-- Logo -->
        <div class="layout-topbar-logo-container">
            <p-button 
                icon="pi pi-bars" 
                [text]="true"
                [rounded]="true"
                class="layout-menu-button"
                (onClick)="layoutService.onMenuToggle()">
            </p-button>
            <a class="layout-topbar-logo" routerLink="/">
                <img src="logo.png" alt="AJM" class="logo-img" />
            </a>
        </div>

        <!-- Main Navigation (Center) -->
        <div class="topbar-nav flex align-items-center gap-4 hidden md:flex">
             <a routerLink="/dashboard" routerLinkActive="active-link" class="nav-link">Dashboard</a>
             <a routerLink="/markets" routerLinkActive="active-link" class="nav-link">Markets</a>
             <a routerLink="/quotes" routerLinkActive="active-link" class="nav-link">Quotes</a>
        </div>

        <!-- Actions -->
        <div class="layout-topbar-actions">
            @if (currentUser()) {
                <div class="user-info">
                    <span class="user-name mr-2">{{ currentUser()!.displayName || 'Agent' }}</span>
                     <p-avatar 
                        [label]="getInitials()" 
                        shape="circle" 
                        [style]="{'background-color': 'var(--primary-color)', 'color': 'white'}">
                    </p-avatar>
                </div>
            }
            <p-button icon="pi pi-sign-out" [text]="true" severity="danger" (onClick)="signOut()"></p-button>
        </div>
    </div>`,
    styles: [`
        .layout-topbar {
            background: var(--surface-card);
            border-bottom: 1px solid var(--surface-border);
            padding: 0 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 4rem;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 999;
        }

        .layout-topbar-logo-container {
            display: flex;
            align-items: center;
            gap: 1rem;
            width: 300px; /* Fixed width to match sidebar */
        }

        .logo-img { height: 40px; }

        .nav-link {
            text-decoration: none;
            color: var(--text-color-secondary);
            font-weight: 600;
            font-size: 1rem;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            transition: all 0.2s;
        }

        .nav-link:hover {
            background-color: var(--surface-hover);
            color: var(--text-color);
        }

        .nav-link.active-link {
            background-color: var(--primary-color);
            color: var(--primary-contrast-color);
        }

        .layout-topbar-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
            width: 300px;
            justify-content: flex-end;
        }
        
        .user-info { display: flex; align-items: center; }

        @media (max-width: 991px) {
            .layout-topbar { padding: 0 1rem; }
            .topbar-nav { display: none !important; } /* Hide on mobile for now */
        }
    `]
})
export class AppTopbar {
    private authService = inject(AuthService);
    public layoutService = inject(LayoutService);

    currentUser = this.authService.currentUser;

    getInitials(): string {
        const user = this.currentUser();
        if (!user) return 'U';

        if (user.displayName) {
            const names = user.displayName.split(' ');
            return names.length > 1
                ? names[0][0] + names[names.length - 1][0]
                : names[0][0];
        }

        return user.email?.[0].toUpperCase() || 'U';
    }

    async signOut() {
        await this.authService.signOut();
    }
}
