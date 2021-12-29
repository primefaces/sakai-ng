import { Component, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-config',
    templateUrl:'./app.config.component.html'
})
export class AppConfigComponent implements OnInit{

    topbarThemes: any[];

    componentThemes: any[];

    topbarColor = 'light';

    componentColor = 'blue';

    scale:number = 14;
    
    scales:any[] = [12,13,14,15,16];

    constructor(public app: AppComponent, public appMain: AppMainComponent) {}

    ngOnInit() { }
    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        }
        else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    onConfigButtonClick(event) {
        this.appMain.configActive = !this.appMain.configActive;
        this.appMain.configClick = true;
        event.preventDefault();
    }

    incrementScale(){
        this.scale++;
        this.applyScale();
    }

    decrementScale(){
        this.scale--;
        this.applyScale();
    }

    applyScale(){
        document.documentElement.style.fontSize = this.scale + 'px';
    }

}