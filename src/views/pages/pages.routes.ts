import { Routes } from '@angular/router';

export default [
  { path: 'documentation', loadComponent: () => import('./documentation').then(c => c.Documentation)},
  { path: 'crud', loadComponent: () => import('./crud').then(c => c.Crud)},
  { path: 'landing', loadComponent: () => import('./landing').then(c => c.Landing)},
  { path: 'empty', loadComponent: () => import('./empty').then(c => c.Empty)},
  { path: 'notfound', loadComponent: () => import('./notfound').then(c => c.Notfound)},
  { path: '**', redirectTo: '/notfound' }
] as Routes;
