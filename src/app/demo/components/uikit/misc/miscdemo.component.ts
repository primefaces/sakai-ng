import { Component, OnDestroy, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    templateUrl: './miscdemo.component.html',
    standalone: true,
    imports: [ProgressBarModule, BadgeModule, ButtonModule, AvatarGroupModule, AvatarModule, ScrollPanelModule, ScrollTopModule, TagModule, ChipModule, SkeletonModule]
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
