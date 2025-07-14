import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthProfileComponent } from './components/auth-profile/auth-profile.component';
import { AuthUpdatePasswordComponent } from './components/auth-update-password/auth-update-password.component';

//const routes: Routes = [];
const routes: Routes = [
  { path: 'login', component: AuthLoginComponent },
  { path: 'profile', component: AuthProfileComponent },
  { path: 'update_password', component: AuthUpdatePasswordComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
