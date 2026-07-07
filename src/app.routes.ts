import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './app/auth/auth.guard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { panelRoutes } from './app/panel/panel.routes';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'panel/dashboard' },
    {
        path: 'panel',
        canActivate: [authGuard],
        children: panelRoutes
    },
    { path: 'landing', component: Landing, canActivate: [guestGuard] },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
