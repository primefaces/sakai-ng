import { Routes } from '@angular/router';

import { authGuard } from './app/core/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./app/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./app/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'markets',
                loadComponent: () => import('./app/pages/markets/markets.component').then(m => m.MarketsComponent)
            },
            {
                path: 'mga',
                loadComponent: () => import('./app/pages/mga/mga.component').then(m => m.MgaComponent)
            },
            {
                path: 'underwriting',
                loadComponent: () => import('./app/pages/underwriting-workbench/underwriting-workbench.component').then(m => m.UnderwritingWorkbenchComponent)
            },
            {
                path: 'quotes',
                loadComponent: () => import('./app/pages/quotes/quote-list.component').then(m => m.QuoteListComponent)
            },
            {
                path: 'quotes/new',
                loadComponent: () => import('./app/pages/new-quote/new-quote.component').then(m => m.NewQuoteComponent)
            },
            {
                path: 'quotes/:id',
                loadComponent: () => import('./app/pages/quotes/quote-detail.component').then(m => m.QuoteDetailComponent)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./app/pages/login/login.component').then(m => m.LoginComponent)
    },
    { path: '**', redirectTo: '' }
];
