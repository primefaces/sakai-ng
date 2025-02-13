import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../api/auth.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../../../../assets/models/LoginObj";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit, OnDestroy{
    loginRequest: LoginRequest;
    rememberMe: boolean = false;
    _loginSub: Subscription | null = null;

    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginRequest = {name: '', password: ''}
    }

    ngOnDestroy():void{
        if (this._loginSub) this._loginSub.unsubscribe();
    }

    login() {
        this._loginSub = this.authService.loginUser(this.loginRequest, this.rememberMe)
            .subscribe({
                next: () => {
                    if(this.authService.isLoggedIn())
                        this.router.navigate(['/']);
                },
                error: (error:HttpErrorResponse) => { this.messageService
                    .add({severity: 'error', summary: 'Error', detail: error.error}); }
            });
    }
}
