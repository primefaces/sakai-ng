import { Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { EmptyComponent } from './empty/empty.component';

export default [
    { path: 'documentation', component: DocumentationComponent },
    { path: 'crud', component: CrudComponent },
    { path: 'empty', component: EmptyComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
