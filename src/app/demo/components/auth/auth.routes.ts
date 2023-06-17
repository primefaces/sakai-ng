import { Route } from '@angular/router';

export const AUTH_ROUTES: Route[] = [
    { path: 'error', loadComponent: () => import('./error/error.component').then(m => m.ErrorComponent) },
    { path: 'access', loadComponent: () => import('./access/access.component').then(m => m.AccessComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    { path: '**', redirectTo: '/notfound' }
];
