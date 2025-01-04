import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthGuardRemember} from "../../guards/auth-guards";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error',
            loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access',
            loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login', canActivate: [AuthGuardRemember],
            loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
