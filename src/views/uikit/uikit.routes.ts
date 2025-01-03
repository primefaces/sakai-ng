import { Routes } from '@angular/router';

export default [
    { path: 'button', data: { breadcrumb: 'Button' }, loadComponent: () => import('./buttondoc').then(c => c.ButtonDoc) },
    { path: 'charts', data: { breadcrumb: 'Charts' }, loadComponent: () => import('./chartdoc').then(c => c.ChartDoc) },
    { path: 'file', data: { breadcrumb: 'File' }, loadComponent: () => import('./filedoc').then(c => c.FileDoc) },
    { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, loadComponent: () => import('./formlayoutdoc').then(c => c.FormLayoutDoc) },
    { path: 'input', data: { breadcrumb: 'Input' }, loadComponent: () => import('./inputdoc').then(c => c.InputDoc) },
    { path: 'list', data: { breadcrumb: 'List' }, loadComponent: () => import('./listdoc').then(c => c.ListDoc) },
    { path: 'media', data: { breadcrumb: 'Media' }, loadComponent: () => import('./mediadoc').then(c => c.MediaDoc) },
    { path: 'message', data: { breadcrumb: 'Message' }, loadComponent: () => import('./messagesdoc').then(c => c.MessagesDoc) },
    { path: 'misc', data: { breadcrumb: 'Misc' }, loadComponent: () => import('./miscdoc').then(c => c.MiscDoc) },
    { path: 'panel', data: { breadcrumb: 'Panel' }, loadComponent: () => import('./panelsdoc').then(c => c.PanelsDoc) },
    { path: 'table', data: { breadcrumb: 'Table' }, loadComponent: () => import('./tabledoc').then(c => c.TableDoc) },
    { path: 'tree', data: { breadcrumb: 'Tree' }, loadComponent: () => import('./treedoc').then(c => c.TreeDoc) },
    { path: 'menu', data: { breadcrumb: 'Menu' }, loadComponent: () => import('./menudoc').then(c => c.MenuDoc) },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
