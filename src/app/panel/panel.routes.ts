import { Routes } from '@angular/router';
import { PanelLayoutComponent } from './panel-layout.component';
import { BlankSectionPage } from './pages/blank-section.page';

export const panelRoutes: Routes = [
    {
        path: '',
        component: PanelLayoutComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', component: BlankSectionPage, data: { title: 'Dashboard', subtitle: 'Your document-tracking overview will live here.' } },
            { path: 'documents', component: BlankSectionPage, data: { title: 'Document', subtitle: 'Document workflow screens can be built here next.' } },
            { path: 'storage', component: BlankSectionPage, data: { title: 'Storage', subtitle: 'Storage management views and file handling will sit here.' } },
            { path: 'classification', component: BlankSectionPage, data: { title: 'Classification', subtitle: 'Classification rules and taxonomies can be added here.' } },
            { path: 'users', component: BlankSectionPage, data: { title: 'User Account', subtitle: 'User account administration starts here.' } },
            { path: 'roles-permissions', component: BlankSectionPage, data: { title: 'Role and Permission', subtitle: 'Define access control and permissions on this page.' } }
        ]
    }
];
