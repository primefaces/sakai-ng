import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../core/services/auth.service';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RippleModule, ReactiveFormsModule, MessageModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" >
                            <div class="text-center">
                                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Crossfit Tracker</div>
                                <span class="text-muted-color font-medium">Melde dich an</span>
                            </div>
                            <div class="mt-4">
                                <label for="username" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Name</label>
                                <input id="username" pInputText formControlName="username" placeholder="Name" class="w-full md:w-[30rem] mb-2" />
                                @if (loginForm.get('username')?.invalid && loginForm.get('username')?.touched) {
                                    <p-message severity="error" variant="simple" size="small">Name wird benötigt</p-message>
                                }
                                <label for="password" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Passwort</label>
                                <p-password id="password" formControlName="password" placeholder="Passwort" [toggleMask]="true" styleClass="mb-2" [fluid]="true" [feedback]="false"></p-password>
                                @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
                                    <p-message severity="error" variant="simple" size="small">Passwort wird benötigt</p-message>
                                }
                                <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                    <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Passwort vergessen?</span>
                                </div>
                                <p-button type="submit" label="Sign In" styleClass="w-full" [disabled]="loginForm.invalid"></p-button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [MessageService]
})
export class Login {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            this.authService.login(username, password).subscribe({
                next: () => {
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    console.error('Login failed:', err);
                    // Handle error (e.g., show a message to the user)
                }
            });
        }
    }
}
