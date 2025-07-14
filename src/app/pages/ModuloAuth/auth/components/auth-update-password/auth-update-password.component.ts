import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-update-password',
  standalone: true,
  imports: [],
  templateUrl: './auth-update-password.component.html',
  styleUrl: './auth-update-password.component.scss'
})
export class AuthUpdatePasswordComponent {
  current_password = '';
  new_password = '';

  constructor(private authService: AuthService) {}

  updatePassword(): void {
   // this.authService.updatePassword({ current_password: this.current_password, new_password: this.new_password })
   //   .subscribe(
   //     () => alert('Contraseña actualizada correctamente'),
   //     (error) => console.error('Error al actualizar contraseña', error)
   //   );
  }
}
