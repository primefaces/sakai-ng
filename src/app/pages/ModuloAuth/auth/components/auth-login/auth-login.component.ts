import { Component } from '@angular/core';
//import { FormsModule } from '@angular/forms';
//import { RouterModule } from '@angular/router';
//import { ButtonModule } from 'primeng/button';
//import { CheckboxModule } from 'primeng/checkbox';
//import { InputTextModule } from 'primeng/inputtext';
//import { PasswordModule } from 'primeng/password';
//import { RippleModule } from 'primeng/ripple';
//import { AppFloatingConfigurator } from '../../../../../layout/component/app.floatingconfigurator';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../../../shared/utils.service';

@Component({
  standalone: false,
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
 // providers: [UtilsService],
})
export class AuthLoginComponent {
  email: string = '';
  password: string = '';
  checked: boolean = false;
  logining: boolean = false;
  
  constructor(
    public utils: UtilsService,
    private AuthService: AuthService,
    private router: Router,   
  )  {}

  login() { 
    if (this.logining) return; // prevención por doble click
      this.logining = true;
      const req = this.AuthService.login({ email: this.email, password: this.password });
      req.subscribe({
        next: (response) => {
          const msg = response.user != null ? 'session iniciada' : 'La contraseña no coincide.';
          if (response.user != null) {
            this.utils.showSuccess(msg,'Session');
            localStorage.setItem('token', response['token']);
            this.userAuth();
          }
          else{
            this.utils.showError(msg,'Session');
          }
        },
        error: () => {
          this.logining = false;
        },
        complete: () => {
          this.router.navigate(['']); // Cambia a la página que necesites después del login
          this.logining = false;
        }
    });
  }

  userAuth(){
    this.AuthService.getProfile().subscribe(
      (response) => {
        localStorage.setItem('user', JSON.stringify(response));
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }
}
