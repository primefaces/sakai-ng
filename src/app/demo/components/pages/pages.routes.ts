import { Route } from '@angular/router';

export const PAGES_ROUTES: Route[] = [
    { path: 'crud', loadComponent: () => import('./crud/crud.component').then(m => m.CrudComponent) },
    { path: 'empty', loadComponent: () => import('./empty/emptydemo.component').then(m => m.EmptyDemoComponent) },
    { path: 'timeline', loadComponent: () => import('./timeline/timelinedemo.component').then(m => m.TimelineDemoComponent) },
    { path: '**', redirectTo: '/notfound' }
];
