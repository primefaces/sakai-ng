import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    templateUrl: './miscdemo.component.html'
})
export class MiscDemoComponent implements OnInit, OnDestroy {

    value = 0;

    interval: any;

    ngOnInit() {
        this.interval = setInterval(() => {
            this.value = this.value + Math.floor(Math.random() * 10) + 1;
            if (this.value >= 100) {
                this.value = 100;
                clearInterval(this.interval);
            }
        }, 2000);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
