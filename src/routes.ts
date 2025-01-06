import { Routes } from '@angular/router';
import { AppLayout } from '@/src/layout/applayout';
import { Documentation } from '@/src/views/pages/documentation';
import { Dashboard } from '@/src/views/dashboard';
import { Landing } from './views/pages/landing';
import { Notfound } from './views/pages/notfound';

export const routes: Routes = [
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
