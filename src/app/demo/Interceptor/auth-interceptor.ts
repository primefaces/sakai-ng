import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('jwt-token') || sessionStorage.getItem('jwt-token');

        if (token) {
            const clonedRequest = req.clone({
                headers: req.headers
                    .set('Authorization', `Bearer ${token}`)
                    .set('Content-Type', 'application/json')
            });
            return next.handle(clonedRequest);
        }

        return next.handle(req);
    }
}
