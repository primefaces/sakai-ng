import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilsService } from '../../../../../../shared/utils.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-update-profile',
  standalone: false,
  templateUrl: './auth-update-profile.component.html',
  styleUrl: './auth-update-profile.component.scss',
  providers: [UtilsService]
})
export class AuthUpdateProfileComponent {
  saving: boolean = false; 
  modoCambioPassword: boolean = false;
  imageFile: File | null = null;
  imagePreview: string | null = null;

  passwordData = {
    actual: '',
    nueva: '',
    confirmar: ''
  };

  constructor(
      public utils: UtilsService,
      private AuthService: AuthService
  ) {}

  @Input() visible: boolean = false;
  @Input() user!: User;
  @Output() visibleChange = new EventEmitter<boolean>();

  ngOnInit(): void {}
  
  closeDialog() {
    this.visibleChange.emit(false);
  }
  saveUser() { 
    if (this.saving) return; // prevención por doble click
      this.saving = true;
  
      const Data = {
        ...this.user,
        image: this.imagePreview ? this.imagePreview : ''
      }
  
      const req = this.AuthService.updateProfile(Data) ;
  
      req.subscribe({
        next: (response) => {
          const msg ='reinicie su cuenta para los cambios.' ;
          this.utils.showSuccess(msg,'Actualizado');
          localStorage.setItem('user', JSON.stringify(response));
        },
        error: () => {
          this.saving = false;
        },
        complete: () => {
          this.saving = false;
          this.closeDialog();
        }
    });
  }

  savePassword() { 
    if (this.saving) return; // prevención por doble click
      this.saving = true;
  
      const req = this.AuthService.updatePassword(this.passwordData.actual,this.passwordData.nueva,this.passwordData.confirmar);
  
      req.subscribe({
        next: (response) => {
          const msg = response == true ? 'Contraseña actualizada correctamente' : 'La contraseña es incorrecto';
          this.utils.showSuccess(msg,'Actualizado');
        },
        error: () => {
          this.saving = false;
        },
        complete: () => {
          this.saving = false;
          this.closeDialog();
        }
    });
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
      // Mostrar preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  togglePasswordMode() {
    this.modoCambioPassword = !this.modoCambioPassword;
  }
}
