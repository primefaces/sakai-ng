import { Routes } from '@angular/router';
import {AppLayoutComponent} from './layout/app.layout.component';

export const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children:
      [
      // { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      // { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
      // { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
      // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
      // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
        { path: 'pages', loadChildren: () => import('../views/pages/pages.routes')},

    ]
  },
  { path: 'auth', loadChildren: () => import('../views/pages/auth/auth.routes')},
  { path: '**', redirectTo: '/notfound' },
];
