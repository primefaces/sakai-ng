import { Routes } from '@angular/router';
import { Access } from '@/src/views/pages/auth/access';
import { Login } from '@/src/views/pages/auth/login';
import { Error } from '@/src/views/pages/auth/error';

export default [
  { path: 'access', component: Access},
  { path: 'error', component: Error},
  { path: 'login', component: Login},
] as Routes;
