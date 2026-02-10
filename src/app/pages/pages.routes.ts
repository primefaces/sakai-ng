import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Config } from './config/config';
import { LayoutBuilder } from './builder/builder';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'config', component: Config },
    { path: 'builder', component: LayoutBuilder },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
