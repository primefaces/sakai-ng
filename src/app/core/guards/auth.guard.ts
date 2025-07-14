import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/ModuloAuth/auth/services/auth.service';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toast: MessageService) {}

  //canActivate(
  //  route: ActivatedRouteSnapshot,
  //  state: RouterStateSnapshot
  //): Observable<boolean> | boolean {
  //  if (!this.authService.hasToken()) {
  //    this.router.navigate(['/auth/login']);
  //    return false;
  //  }
  //  return true;
  //}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          console.log('🔴 Sin token. Redirigiendo a /auth/login');
          this.router.navigate(['/auth/login']);
          return false;
        }
        // Si el token es válido, permite el acceso a la ruta
        console.log('🟢 Token encontrado. Permitiendo acceso.');
        return true;
      })
    );
  }
}
