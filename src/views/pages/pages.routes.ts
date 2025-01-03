import { Routes } from '@angular/router';
import { Documentation } from '@/src/views/pages/documentation';
import { Crud } from '@/src/views/pages/crud';
import { Landing } from '@/src/views/pages/landing';
import { Empty } from '@/src/views/pages/empty';
import { Notfound } from '@/src/views/pages/notfound';

export default [
  { path: 'documentation', component: Documentation},
  { path: 'crud', component: Crud},
  { path: 'landing', component: Landing},
  { path: 'empty', component: Empty},
  { path: 'notfound', component: Notfound},
  { path: '**', redirectTo: '/notfound' }
] as Routes;
