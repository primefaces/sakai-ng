import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { UtilsService } from '../../../../../../shared/utils.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth-profile',
  standalone: false,
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.scss'],
  providers: [UtilsService],
  host: {
    class: `
      absolute 
      top-[9.5rem] 
      sm:top-[5rem] 
      right-1 
      w-72 
      p-2
      bg-surface-0 
      dark:bg-surface-900 
      border 
      border-surface 
      rounded-border 
      origin-top 
      shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]
    `
  }
  
  
})
export class AuthProfileComponent {
  user: User = {} as User;
  logoutin: boolean = false;
  showProfileDialog: boolean = false;

  @Input() visible: boolean = false;
  constructor(
    public utils: UtilsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userTemp(); 
  }

  userTemp(){
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
     // console.log(this.user);
    }
  }
 

  logout(): void {
    if (this.logoutin) return;

    this.logoutin = true;
    const req = this.authService.logout();
    req.subscribe({
      next: () => {
        this.utils.showSuccess('Sesión cerrada', 'Logout');
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


  goToUpdateProfile(): void {
    this.showProfileDialog = true;
  }
}

