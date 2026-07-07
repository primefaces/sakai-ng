import { CommonModule } from '@angular/common';
import {
    Component,
    HostListener,
    OnDestroy,
    OnInit,
    computed,
    inject,
    signal
} from '@angular/core';
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Subject, filter, takeUntil } from 'rxjs';
import { AuthService } from '@/app/auth/auth.service';
import { ConfirmationDialogComponent } from '@/app/shared/components/confirmation-dialog/confirmation-dialog.component';

interface PanelNavItem {
    label: string;
    icon: string;
    route: string;
}

@Component({
    selector: 'app-panel-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, ConfirmationDialogComponent],
    styleUrls: ['./panel-layout.component.scss'],
    template: `
        <div class="panel-shell">
            <div *ngIf="sidebarOpen()" class="panel-backdrop" (click)="closeSidebar()"></div>

            <aside class="panel-sidebar" [class.mobile-open]="sidebarOpen()">
                <div class="panel-brand">
                    <div class="brand-mark">DT</div>
                    <div>
                        <div class="brand-title">Document Tracking</div>
                        <div class="brand-subtitle">Secure panel workspace</div>
                    </div>
                </div>

                <nav class="panel-nav">
                    <a *ngFor="let item of navItems" [routerLink]="item.route" routerLinkActive="active" class="nav-item">
                        <i [class]="item.icon"></i>
                        <span>{{ item.label }}</span>
                    </a>
                </nav>

                <div class="panel-sidebar-card">
                    <div class="sidebar-session-label">Session</div>
                    <div class="sidebar-name">{{ userName() }}</div>
                    <div class="sidebar-role">{{ userRole() }}</div>
                    <button pButton type="button" class="sidebar-logout" severity="danger" label="Logout" icon="pi pi-sign-out" (click)="openLogoutConfirm()"></button>
                </div>
            </aside>

            <div class="panel-main">
                <header class="panel-topbar">
                    <div class="topbar-left">
                        <button pButton type="button" class="topbar-menu" severity="secondary" text icon="pi pi-bars" (click)="toggleSidebar()"></button>
                        <div>
                        
                            <div class="topbar-title">{{ pageTitle() }}</div>
                            <div class="topbar-subtitle">{{ pageSubtitle() }}</div>
                        </div>
                    </div>

                    <div class="topbar-right">
                        <div class="topbar-account">
                            <div class="topbar-avatar">
                                <i class="pi pi-user"></i>
                            </div>
                            <div class="topbar-account-copy">
                                <div class="topbar-account-name">{{ userName() }}</div>
                                <div class="topbar-account-role">{{ userRole() }}</div>
                            </div>
                        </div>
                    </div>
                </header>

                <main class="panel-content">
                    <router-outlet></router-outlet>
                </main>
            </div>

            <app-confirmation-dialog
                [(visible)]="logoutConfirmVisible"
                title="Log out?"
                subtitle="End your current session"
                message="Are you sure you want to log out of the control panel?"
                confirmLabel="Log out"
                cancelLabel="Stay signed in"
                tone="primary"
                [dismissableMask]="true"
                (confirm)="confirmLogout()"
            />
        </div>
    `
})
export class PanelLayoutComponent implements OnInit, OnDestroy {
    private auth = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private destroy$ = new Subject<void>();

    navItems: PanelNavItem[] = [
        { label: 'Dashboard', icon: 'pi pi-home', route: '/panel/dashboard' },
        { label: 'Document', icon: 'pi pi-file', route: '/panel/documents' },
        { label: 'Storage', icon: 'pi pi-database', route: '/panel/storage' },
        { label: 'Classification', icon: 'pi pi-tags', route: '/panel/classification' },
        { label: 'User Account', icon: 'pi pi-users', route: '/panel/users' },
        { label: 'Role and Permission', icon: 'pi pi-shield', route: '/panel/roles-permissions' }
    ];

    pageTitle = signal('Dashboard');
    pageSubtitle = signal('Your document-tracking overview will live here.');
    logoutConfirmVisible = false;

    userName = computed(() => {
        const user = this.auth.user();
        if (!user) {
            return 'Guest';
        }

        return `${user.firstname} ${user.lastname}`.trim();
    });

    userRole = computed(() => this.auth.user()?.role?.role_name ?? 'User');
    sidebarOpen = signal(false);

    ngOnInit() {
        this.syncPageMeta();

        this.router.events
            .pipe(
                filter((event): event is NavigationEnd => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.syncPageMeta();
                this.closeSidebar();
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openLogoutConfirm() {
        this.logoutConfirmVisible = true;
    }

    confirmLogout() {
        this.auth.logout();
        this.logoutConfirmVisible = false;
        this.router.navigate(['/auth/login']);
    }

    toggleSidebar() {
        this.sidebarOpen.update((value) => !value);
    }

    closeSidebar() {
        this.sidebarOpen.set(false);
    }

    @HostListener('window:resize')
    onResize() {
        if (window.innerWidth > 991) {
            this.sidebarOpen.set(false);
        }
    }

    private syncPageMeta() {
        const snapshot = this.getDeepestSnapshot();
        const data = snapshot?.data ?? {};

        this.pageTitle.set((data['title'] as string) ?? this.titleFromUrl(this.router.url));
        this.pageSubtitle.set((data['subtitle'] as string) ?? 'Manage this section from the panel.');
    }

    private getDeepestSnapshot() {
        let current = this.route;

        while (current.firstChild) {
            current = current.firstChild;
        }

        return current.snapshot;
    }

    private titleFromUrl(url: string) {
        const segment = url.split('?')[0].split('#')[0].split('/').filter(Boolean).pop() ?? 'dashboard';

        switch (segment) {
            case 'documents':
                return 'Document';
            case 'storage':
                return 'Storage';
            case 'classification':
                return 'Classification';
            case 'users':
                return 'User Account';
            case 'roles-permissions':
                return 'Role and Permission';
            default:
                return 'Dashboard';
        }
    }
}
