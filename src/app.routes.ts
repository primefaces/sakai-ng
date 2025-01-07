import { Routes } from '@angular/router';
import { Landing } from './views/pages/landing';
import { Notfound } from './views/pages/notfound';
import { AppLayout } from './layout/app.layout';
import { Dashboard } from './views/dashboard';
import { Documentation } from './views/pages/documentation';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./views/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./views/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.routes') }
];
