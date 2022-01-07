import { Component } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent{
    constructor(public appMain: AppMainComponent) {}
}
