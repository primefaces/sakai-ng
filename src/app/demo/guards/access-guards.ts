import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../components/auth/api/auth.service";

export const AuthGuardAdmin: CanActivateFn = () => {
    const userService: AuthService = inject(AuthService);

    if (!userService.isLoggedIn()) {
        const router: Router = inject(Router);
        router.navigate(['/auth/access']);
    }
    return userService.isLoggedIn();
};
