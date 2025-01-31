import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { Password } from 'primeng/password';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, AppFloatingConfigurator, Password, InputText, Button, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    fb = inject(FormBuilder);
    http = inject(HttpClient);
    router = inject(Router);
    authService = inject(AuthService);

    form = this.fb.nonNullable.group({
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    errorMessage: string | null = null;
    loading: boolean = false;

    onSubmit(): void {
        const rawForm = this.form.getRawValue();
        console.log('Inside Component submit: ', rawForm.email, rawForm.username, rawForm.password);
        this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe((result) => {
            console.log(result);
            if (result.error) {
                this.errorMessage = result.error.message;
                console.log(this.errorMessage);
            } else {
                this.router.navigateByUrl('/');
            }
        });
    }
}
