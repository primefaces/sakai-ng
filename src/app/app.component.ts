import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    menuMode = 'static';

    inputStyle = 'outlined';

    ripple: boolean;

    darkMode: boolean = false;

    lightMode: boolean = true;

    theme = 'light';

    constructor(private primengConfig: PrimeNGConfig) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;
        document.documentElement.style.fontSize = '14px';
    }
}
