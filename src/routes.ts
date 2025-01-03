import { Routes } from '@angular/router';
import { AppLayout} from '@/src/layout/applayout';

export const routes: Routes = [
    {
        path: '', component: AppLayout,
        children:
            [
                { path: '', loadComponent: () => import('./views/dashboard').then(c => c.Dashboard) },
                { path: 'uikit', loadChildren: () => import('./views/uikit/uikit.routes')},
                { path: 'pages', loadChildren: () => import('./views/pages/pages.routes')},
                {path: 'documentation', loadComponent: () => import('./views/pages/documentation').then(c => c.Documentation)}
            ]
    },
    { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.routes')},
    { path: '**', redirectTo: '/notfound' },
];
