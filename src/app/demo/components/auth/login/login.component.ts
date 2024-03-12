import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signIn, signOut } from '@aws-amplify/auth'; // Assuming signIn is correctly imported
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    // styles unchanged
})
export class LoginComponent {
    email: string = '';
    password: string = '';

    constructor(public layoutService: LayoutService, private router: Router) { }

    async onClick() {
        alert ('Attempting to sign in with:' + this.email);
        console.log('Attempting to sign in with:' + this.email);
        try {
            await signOut();


            signIn({username: this.email, password: this.password} )
                .then(user => {
                    // Redirect or perform action after successful sign-in
                    console.log('Sign in successful', user);
                    // Example redirection with JavaScript
                    window.location.href = '/dashboard';
                })
                .catch(error => console.error('Sign in error', error));


            /*
            const user = await signIn({ username: this.email, password: this.password });
          //  alert('Sign-in successful:' + user);
            // Process user sign-in success, e.g., navigate to a dashboard
            this.router.navigate(['/dashboard']);

             */
        } catch (error) {
            alert('Sign-in failed:' + error);

        }
    }
}
