import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '@/app/auth/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, ReactiveFormsModule, RouterModule],
    template: `
        <div class="login-shell">
            <div class="login-overlay"></div>

            <div class="login-panel">
                <section class="login-hero">
                    <div class="hero-copy">
                        <div class="hero-kicker">Document Tracking System</div>
                        <h1>Secure access for your document control center.</h1>
                        <p>Manage the full document lifecycle from one secure workspace. This portal keeps records organized, routes access by role, and brings documents, storage, users, and permissions together in a clean panel experience.</p>
                    </div>
                </section>

                <section class="login-card">
                    <div class="login-card-header">
                        <div class="login-logo">
                            <img src="/images/peanut_kisses_logo-removebg-preview.png" alt="Peanut Kisses logo" />
                        </div>
                        <div>
                            <div class="login-title">Welcome back</div>
                            <div class="login-subtitle">Use your email and password to continue.</div>
                        </div>
                    </div>

                    <form class="login-form" [formGroup]="form" (ngSubmit)="submit()">
                        <div class="field">
                            <label>Email</label>
                            <input pInputText formControlName="email" type="email" placeholder="admin@document-tracking.com" />
                            <small *ngIf="isInvalid('email')">Enter a valid email address.</small>
                        </div>

                        <div class="field">
                            <label>Password</label>
                            <p-password formControlName="password" placeholder="Enter password" [toggleMask]="true" [feedback]="false" [fluid]="true"></p-password>
                            <small *ngIf="isInvalid('password')">Password is required.</small>
                        </div>

                        <div class="login-meta">
                            <label class="remember">
                                <p-checkbox formControlName="rememberMe" [binary]="true"></p-checkbox>
                                <span>Remember me</span>
                            </label>
                        </div>

                        <p-button type="submit" [loading]="loading" label="Sign In" icon="pi pi-arrow-right" styleClass="w-full"></p-button>

                        <p class="error-message" *ngIf="errorMessage">{{ errorMessage }}</p>
                    </form>
                </section>
            </div>
        </div>
    `
})
export class Login {
    private fb = inject(FormBuilder);
    private auth = inject(AuthService);
    private router = inject(Router);

    loading = false;
    errorMessage = '';

    form = this.fb.group({
        email: ['admin@document-tracking.com', [Validators.required, Validators.email]],
        password: ['admin123', [Validators.required]],
        rememberMe: [true]
    });

    submit() {
        this.errorMessage = '';
        this.form.markAllAsTouched();

        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        const { email, password } = this.form.getRawValue();

        this.auth.login({ email: email ?? '', password: password ?? '' }).subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate(['/panel/dashboard']);
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = error?.error?.message || 'Login failed. Please check your credentials and try again.';
            }
        });
    }

    isInvalid(controlName: 'email' | 'password') {
        const control = this.form.get(controlName);
        return !!control && control.invalid && (control.dirty || control.touched);
    }
}
