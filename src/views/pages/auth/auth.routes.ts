import { Routes } from '@angular/router';

export default [
  { path: 'access', loadComponent: () => import('./access').then(c => c.Access)},
  { path: 'error', loadComponent: () => import('./error').then(c => c.Error)},
  { path: 'login', loadComponent: () => import('./login').then(c => c.Login)},
] as Routes;
