import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../components/auth/api/auth.service";

export const AuthGuardRemember: CanActivateFn = () => {
  const userService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (userService.isLoggedIn()) {
    router.navigate(['']);
    return false;
  }
  else { return true; }
};
