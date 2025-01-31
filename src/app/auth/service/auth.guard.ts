import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    console.log('Auth Guard: Checking authentication...');

    // Wait for session restoration to complete
    if (!authService.isSessionRestored()) {
        console.warn('Auth Guard: Waiting for session restoration...');
        await authService.restoreSession(); // Restore session if needed
    }

    const user = authService.currentUser();
    console.log('Auth Guard: Current User:', user);

    if (user) {
        console.log('Auth Guard: User is authenticated.');
        return true; // Allow access
    } else {
        console.warn('Auth Guard: User is not authenticated. Redirecting to /auth/login.');
        router.navigateByUrl('/auth/login');
        return false; // Deny access
    }
};
