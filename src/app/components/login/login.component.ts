import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
    }
  `]
})
export class LoginComponent implements OnInit {

  valCheck: string[] = ['remember'];
  password: string;
  themeElement: any;

  constructor() { }

  ngOnInit(): void {
    this.themeElement = document.getElementById('theme-css');
    this.themeElement.setAttribute('href','assets/theme/saga-blue/theme.css');
  }

  ngOnDestroy(): void {
    this.themeElement.setAttribute('href', 'assets/theme/lara-light-indigo/theme.css');
  }

}
