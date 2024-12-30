import { Routes } from '@angular/router';
import {Documentation} from './documentation';
import {Crud} from './crud';
import {Landing} from './landing';
import {Empty} from './empty';
import {Notfound} from './notfound';

export default [
  { path: 'documentation', component: Documentation},
  { path: 'crud', component: Crud},
  { path: 'landing', component: Landing},
  { path: 'empty', component: Empty},
  { path: 'notfound', component: Notfound},
  { path: '**', redirectTo: '/notfound' }
] as Routes;
