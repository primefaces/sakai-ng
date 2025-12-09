import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { TreeModule } from 'primeng/tree';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { DrawerModule } from 'primeng/drawer';
import { TreeNode, MenuItem } from 'primeng/api';
// import { AppMenu } from './app/layout/component/app.menu'; // Reverting
import { AuthService } from './app/core/services/auth.service';
import { ThemeService } from './app/core/services/theme.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ToolbarModule,
        ButtonModule,
        SplitterModule,
        TreeModule,
        ToggleSwitchModule,
        AvatarModule,
        MenuModule,
        DrawerModule
        // AppMenu // Reverting
    ],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    private authService = inject(AuthService);
    private themeService = inject(ThemeService);
    private router = inject(Router);

    currentUser = this.authService.currentUser;
    // Expose signal value for template binding if needed, or getter
    get isDarkMode() { return this.themeService.isDarkMode(); }

    mobileSidebarVisible = false;
    isLoginPage = false;
    navItems: TreeNode[] = [];
    mobileNavItems: TreeNode[] = [];
    userMenuItems: MenuItem[] = [];

    selectedNode: TreeNode | null = null;

    updateMenu(url: string) {
        this.isLoginPage = url === '/login';

        this.navItems = [
            {
                label: 'Dashboard',
                icon: 'pi pi-home',
                expanded: true,
                children: [
                    { label: 'Overview', icon: 'pi pi-chart-bar', data: '/dashboard' }
                ]
            },
            {
                label: 'Markets',
                icon: 'pi pi-search',
                expanded: true,
                children: [
                    { label: 'Find Markets', icon: 'pi pi-search', data: '/markets' },
                    { label: 'MGA Guidelines', icon: 'pi pi-list', data: '/mga' }
                ]
            },
            {
                label: 'Quotes',
                icon: 'pi pi-file',
                expanded: true,
                children: [
                    { label: 'Underwriting', icon: 'pi pi-pencil', data: '/underwriting' },
                    { label: 'My Quotes', icon: 'pi pi-file', data: '/quotes' }
                ]
            }
        ];

        this.mobileNavItems = [...this.navItems];

        // Find active node
        this.selectedNode = this.findActiveNode(this.navItems, url);

        this.userMenuItems = [
            { label: 'Profile', icon: 'pi pi-user' },
            { label: 'Settings', icon: 'pi pi-cog' },
            { separator: true },
            { label: 'Sign Out', icon: 'pi pi-sign-out', command: () => this.signOut() }
        ];
    }

    findActiveNode(nodes: TreeNode[], url: string): TreeNode | null {
        for (const node of nodes) {
            if (node.data && (url === node.data || url.startsWith(node.data + '/'))) {
                return node;
            }
            if (node.children) {
                const found = this.findActiveNode(node.children, url);
                if (found) return found;
            }
        }
        return null;
    }

    // ... (rest of methods)

    constructor() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateMenu(event.url);
            }
        });
    }

    ngOnInit() {
        // ThemeService handles initialization now
        this.updateMenu(this.router.url);
    }

    // ... (rest)

    toggleDarkMode() {
        this.themeService.toggleDarkMode();
    }

    onNodeSelect(event: any) {
        if (event.node.data) {
            this.router.navigate([event.node.data]);
        }
    }

    signOut() {
        this.authService.signOut();
    }
}
