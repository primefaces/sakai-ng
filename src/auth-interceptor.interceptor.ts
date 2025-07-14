import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/pages/ModuloAuth/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable(
  { providedIn: 'root' }
)
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService, 
    private toastr: MessageService, 
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    console.log("Interceptor ejecutado token = ", token);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Agregar el token a las cabeceras de la solicitud
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!navigator.onLine) {
          this.toastr.add({ severity: 'error', summary: 'Error de conexión', detail: 'Sin conexión a Internet',icon: 'pi pi-info-circle' });
        } else if (error.status === 0) {
          this.toastr.add({ severity: 'error', summary: 'Servidor no disponible', detail: 'No se pudo conectar con la API.', icon: 'pi pi-info-circle' });
        } else if (error.status === 401) {
          this.toastr.add({ severity: 'warning', summary: 'Acceso denegado', detail: 'No está autenticado. Inicie sesión nuevamente.',icon: 'pi pi-info-circle' });
          // Eliminar token y redirigir al login (opcional)
          //this.authService.logout();
          this.router.navigate(['/auth/login']); // Redirigir a la página de login
        } else if (error.status === 500) {
          this.toastr.add({ severity: 'error', summary: 'Error 500', detail: 'Error interno del servidor.',icon: 'pi pi-info-circle' });
        } else if (error.status === 400) {
          Object.keys(error.error.errors).forEach((campo) => {
            error.error.errors[campo].forEach((mensaje: string) => {
              this.toastr.add({ severity: 'error', summary: 'Error de validación', detail: mensaje ,icon: 'pi pi-info-circle'});
            });
        });
        } else if (error.status === 403) {
          this.toastr.add({ severity: 'error', summary: 'Acceso denegado', detail: 'No tiene permiso para acceder a este recurso.',icon: 'pi pi-info-circle' });
        }
        return throwError(() => error); // Propagar el error
      })
    );
  }
}

// Registrar el interceptor
export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];
