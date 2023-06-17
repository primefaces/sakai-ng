import { Route } from '@angular/router';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

export const APP_ROUTES: Route[] = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadComponent: () => import('./demo/components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.routes').then(m => m.UIKIT_ROUTES) },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
        ]
    },
    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.routes').then(m => m.AUTH_ROUTES) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
];
