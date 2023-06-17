import { Route } from '@angular/router';

export const UIKIT_ROUTES: Route[] = [
    { path: 'button', data: { breadcrumb: 'Button' }, loadComponent: () => import('./button/buttondemo.component').then(m => m.ButtonDemoComponent) },
    { path: 'charts', data: { breadcrumb: 'Charts' }, loadComponent: () => import('./charts/chartsdemo.component').then(m => m.ChartsDemoComponent) },
    { path: 'file', data: { breadcrumb: 'File' }, loadComponent: () => import('./file/filedemo.component').then(m => m.FileDemoComponent) },
    { path: 'floatlabel', data: { breadcrumb: 'Float Label' }, loadComponent: () => import('./floatlabel/floatlabeldemo.component').then(m => m.FloatLabelDemoComponent) },
    { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, loadComponent: () => import('./formlayout/formlayoutdemo.component').then(m => m.FormLayoutDemoComponent) },
    { path: 'input', data: { breadcrumb: 'Input' }, loadComponent: () => import('./input/inputdemo.component').then(m => m.InputDemoComponent) },
    { path: 'invalidstate', data: { breadcrumb: 'Invalid State' }, loadComponent: () => import('./invalid/invalidstatedemo.component').then(m => m.InvalidStateDemoComponent) },
    { path: 'list', data: { breadcrumb: 'List' }, loadComponent: () => import('./list/listdemo.component').then(m => m.ListDemoComponent) },
    { path: 'media', data: { breadcrumb: 'Media' }, loadComponent: () => import('./media/mediademo.component').then(m => m.MediaDemoComponent) },
    { path: 'message', data: { breadcrumb: 'Message' }, loadComponent: () => import('./messages/messagesdemo.component').then(m => m.MessagesDemoComponent) },
    { path: 'misc', data: { breadcrumb: 'Misc' }, loadComponent: () => import('./misc/miscdemo.component').then(m => m.MiscDemoComponent) },
    { path: 'overlay', data: { breadcrumb: 'Overlay' }, loadComponent: () => import('./overlays/overlaysdemo.component').then(m => m.OverlaysDemoComponent) },
    { path: 'panel', data: { breadcrumb: 'Panel' }, loadComponent: () => import('./panels/panelsdemo.component').then(m => m.PanelsDemoComponent) },
    { path: 'table', data: { breadcrumb: 'Table' }, loadComponent: () => import('./table/tabledemo.component').then(m => m.TableDemoComponent) },
    { path: 'tree', data: { breadcrumb: 'Tree' }, loadComponent: () => import('./tree/treedemo.component').then(m => m.TreeDemoComponent) },
    { path: 'menu', data: { breadcrumb: 'Menu' }, loadChildren: () => import('./menus/menus.routes').then(m => m.MENUS_ROUTES) },
    { path: '**', redirectTo: '/notfound' }
];
