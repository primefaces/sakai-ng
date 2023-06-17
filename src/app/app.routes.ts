import { Route } from '@angular/router';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

export const APP_ROUTES: Route[] = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadComponent: () => import('./demo/components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.routes').then(m => m.UIKIT_ROUTES) },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.routes').then(m => m.UTILTIES_ROUTES) },
            { path: 'documentation', loadComponent: () => import('./demo/components/documentation/documentation.component').then(m => m.DocumentationComponent) },
            { path: 'blocks', loadComponent: () => import('./demo/components/primeblocks/blocks/blocks.component').then(m => m.BlocksComponent) },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.routes').then(m => m.PAGES_ROUTES) }
        ]
    },
    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.routes').then(m => m.AUTH_ROUTES) },
    { path: 'landing', loadComponent: () => import('./demo/components/landing/landing.component').then(m => m.LandingComponent) },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
];
