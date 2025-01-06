import { Routes } from '@angular/router';
import { Documentation } from '@/src/views/pages/documentation';
import { Crud } from '@/src/views/pages/crud';
import { Empty } from '@/src/views/pages/empty';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
