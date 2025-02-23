import { Routes } from '@angular/router';
import { LayoutComponent } from './app/layout/component/layout/layout.component';
import { DashboardComponent } from './app/pages/dashboard/dashboard/dashboard.component';
import { NotFoundComponent } from './app/pages/not-found/not-found.component';
import { DocumentationComponent } from './app/pages/documentation/documentation.component';
import { LandingComponent } from './app/pages/landing/landing/landing.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: DocumentationComponent },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            {
                path: 'services',
                loadComponent: () => import('./app/pages/services/services.component').then((c) => c.ServicesComponent)
            },
            {
                path: 'sales',
                loadComponent: () => import('./app/pages/sales/sales.component').then((c) => c.SalesComponent)
            },
            {
                path: 'clients',
                loadComponent: () => import('./app/pages/clients/clients.component').then((c) => c.ClientsComponent)
            },
            { path: 'expenses/utilities', loadComponent: () => import('./app/pages/utilities/utilities.component').then((c) => c.UtilitiesComponent) },
            { path: 'expenses/salary', loadComponent: () => import('./app/pages/salary/salary.component').then((c) => c.SalaryComponent) },
            { path: 'expenses/assets', loadComponent: () => import('./app/pages/assets/assets.component').then((c) => c.AssetsComponent) },
            {
                path: 'suppliers',
                loadComponent: () => import('./app/pages/suppliers/suppliers.component').then((c) => c.SuppliersComponent)
            },
            {
                path: 'employees',
                loadComponent: () => import('./app/pages/employees/employees.component').then((c) => c.EmployeesComponent)
            }
        ]
    },
    { path: 'landing', component: LandingComponent },
    { path: 'notfound', component: NotFoundComponent },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
