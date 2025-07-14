import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../pages/ModuloAuth/auth/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ButtonModule,CommonModule, FormsModule,ButtonModule, DialogModule],
  template: `
  <div class="flex flex-col gap-2 p-2 w-[400px]"> <!-- ancho de 400px -->
    <!-- Foto, Nombre y Rol -->
    <div class="flex items-center gap-2">
      <img
        src="assets/img/default-profile.png"
        alt="Profile Photo"
        class="w-10 h-10 rounded-full"
      />
    <div>
      <p class="text-base font-semibold"> {{ user?.email }} </p>
      <div *ngIf="user?.roles?.length > 0">
        <p class="text-sm text-muted-color" *ngFor="let rol of user.roles">
          {{ rol.name }}
        </p>
      </div>
      <p *ngIf="user?.roles?.length === 0" class="text-sm text-muted-color">
        Sin roles
      </p>
    </div>
  </div> 
    <div class="flex gap-2 mt-2">
      <p-button (click)="goToProfile()" label="Perfil" severity="info" class="p-button-sm" />
      <p-button 
        (click)="logout()" 
        label="Cerrar sesión" 
        severity="danger"
        class="p-button-sm"
        [icon]="logoutin ? 'pi pi-spin pi-spinner' : 'pi pi-check'"
        [disabled]="logoutin"
      />
    </div>
  </div>

  <!-- Dropdown para el menú de opciones -->
  <p-dialog 
  header="Editar Perfil" 
  [(visible)]="showProfileDialog" 
  [modal]="true" 
  [style]="{ width: '30rem' }"
  [closable]="false"
  [draggable]="false"
>
  <form class="p-fluid">
    <!-- Email -->
    <div class="field">
      <label for="email">Email</label>
      <input id="email" type="email" pInputText [(ngModel)]="user.email" name="email" required />
    </div>

    <!-- Nombre -->
    <div class="field">
      <label for="name">Nombre</label>
      <input id="name" type="text" pInputText [(ngModel)]="user.name" name="name" required />
    </div>

    <!-- Roles -->
    <div class="field">
      <label>Roles</label>
      <div class="flex flex-column gap-2">
        <div *ngFor="let rol of user?.roles">
          <p-checkbox 
            [(ngModel)]="user.roles"
            name="roles"
            binary="true"
          ></p-checkbox>
          <label [for]="'rol_' + rol.id" class="ml-2">{{ rol.name }}</label>
        </div>
      </div>
    </div>

    <!-- Botones -->
    <div class="flex justify-end gap-2 mt-4">
      <p-button 
        label="Cancelar" 
        icon="pi pi-times" 
        (click)="showProfileDialog = false" 
        class="p-button-text"
      />
      <p-button 
        type="submit" 
        label="Guardar" 
        icon="pi pi-check" 
        [disabled]="!user.email || !user.name"
      />
    </div>
  </form>
</p-dialog>


  `,
  host: {
    class: 'absolute top-[3.25rem] right-0 w-72 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]'
  }
})
export class ProfileComponent {
  user: any;
  logoutin: boolean = false;
  showProfileDialog: boolean = false;


  constructor (
    private authService: AuthService, 
    private toastr: MessageService, 
    private router: Router
  )
  { 
    this.userTemp();
  }

  userTemp(){
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
  }
 

  logout(): void {
    if (this.logoutin) return;

    this.logoutin = true;
    const req = this.authService.logout();
    req.subscribe({
      next: () => {
        this.toastr.add({ severity: 'success', summary: 'session', detail: 'Session Finalizada' });
        this.router.navigate(['/auth/login']); 
      },
      error: () => {
        this.logoutin = false;
      },
      complete: () => {
        this.logoutin = true;
      }
    });
  }


  goToProfile(): void {
    this.showProfileDialog = true;
  }

}
