import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { CrudComponent } from './crud/crud.component';
import { Empty } from './empty/empty';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: CrudComponent },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
