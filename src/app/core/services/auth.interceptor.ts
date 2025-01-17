import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    // Use Angular's inject to access AuthService
    const authService = inject(AuthService);

    // Retrieve the token
    const token = authService.getToken();

    // Clone the request to add the Authorization header, if a token exists
    const authReq = token
        ? req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        })
        : req;

    // Pass the cloned or original request to the next handler
    return next(authReq);
};
