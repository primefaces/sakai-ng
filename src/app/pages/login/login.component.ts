import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    MessageModule
  ],
  template: `
    <div class="login-container">
      <div class="login-card-wrapper">
        <p-card class="login-card">
          <ng-template pTemplate="header">
            <div class="login-header">
              <img src="logo.png" alt="AJM" class="login-logo" />
              <h1 class="login-title">AJM MARKETFINDER</h1>
              <p class="login-subtitle">Insurance CRM Platform</p>
            </div>
          </ng-template>

          <div class="login-form">
            @if (errorMessage) {
              <p-message severity="error" [text]="errorMessage" styleClass="w-full mb-3"></p-message>
            }

            <div class="field">
              <label for="email" class="field-label">Email Address</label>
              <span class="p-input-icon-left w-full">
                <i class="pi pi-envelope"></i>
                <input 
                  pInputText 
                  id="email" 
                  [(ngModel)]="email" 
                  type="email"
                  placeholder="Enter your email"
                  class="w-full"
                  [disabled]="loading"
                  (keyup.enter)="signIn()" />
              </span>
            </div>

            <div class="field">
              <label for="password" class="field-label">Password</label>
              <p-password 
                [(ngModel)]="password" 
                [toggleMask]="true"
                placeholder="Enter your password"
                styleClass="w-full"
                inputStyleClass="w-full"
                [disabled]="loading"
                [feedback]="false"
                (keyup.enter)="signIn()">
              </p-password>
            </div>

            <p-button 
              label="Sign In"
              icon="pi pi-sign-in"
              styleClass="w-full"
              [loading]="loading"
              (onClick)="signIn()">
            </p-button>

            <p-divider align="center">
              <span class="divider-text">OR</span>
            </p-divider>

            <p-button 
              label="Sign in with Google"
              icon="pi pi-google"
              severity="secondary"
              [outlined]="true"
              styleClass="w-full"
              [loading]="loading"
              (onClick)="signInWithGoogle()">
            </p-button>
          </div>

          <ng-template pTemplate="footer">
            <div class="login-footer">
              <p class="footer-text">
                <i class="pi pi-shield"></i>
                Secure login powered by Firebase Authentication
              </p>
            </div>
          </ng-template>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--surface-ground) 0%, var(--surface-100) 100%);
      padding: 2rem;
    }

    .login-card-wrapper {
      width: 100%;
      max-width: 450px;
      animation: fadeInUp 0.5s ease-out;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    :host ::ng-deep .login-card {
      border-radius: var(--content-border-radius);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .login-header {
      text-align: center;
      padding: 2rem 2rem 1rem 2rem;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-400) 100%);
    }

    .login-logo {
      height: 60px;
      width: auto;
      margin-bottom: 1rem;
    }

    .login-title {
      color: var(--primary-contrast-color);
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: 1px;
      margin: 0 0 0.5rem 0;
    }

    .login-subtitle {
      color: var(--primary-contrast-color);
      font-size: 0.875rem;
      font-weight: 500;
      margin: 0;
      opacity: 0.9;
    }

    .login-form {
      padding: 2rem;
    }

    .field {
      margin-bottom: 1.5rem;
    }

    .field-label {
      display: block;
      color: var(--text-color);
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .divider-text {
      color: var(--text-color-secondary);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .login-footer {
      text-align: center;
      padding: 1rem 2rem;
      background: var(--surface-50);
      border-top: 1px solid var(--surface-border);
    }

    .footer-text {
      color: var(--text-color-secondary);
      font-size: 0.75rem;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    @media (max-width: 576px) {
      .login-container {
        padding: 1rem;
      }

      .login-form {
        padding: 1.5rem;
      }

      .login-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  async signIn() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      // For now, use Google sign in (email/password can be added later)
      await this.authService.signInWithGoogle();
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error.code);
    } finally {
      this.loading = false;
    }
  }

  async signInWithGoogle() {
    this.loading = true;
    this.errorMessage = '';

    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = 'Failed to sign in with Google. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/invalid-credential':
        return 'Invalid email or password';
      default:
        return 'An error occurred. Please try again';
    }
  }
}
