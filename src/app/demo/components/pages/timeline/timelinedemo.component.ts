import { Component, OnInit } from '@angular/core';
import { PrimeIcons, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgClass, NgIf } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';

@Component({
    templateUrl: './timelinedemo.component.html',
    styleUrls: ['./timelinedemo.scss'],
    standalone: true,
    imports: [TimelineModule, SharedModule, NgClass, CardModule, NgIf, ButtonModule]
})
export class TimelineDemoComponent implements OnInit {

    events1: any[] = [];

    events2: any[] = [];

    ngOnInit() {
        this.events1 = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B' }
        ];

        this.events2 = [
            "2020", "2021", "2022", "2023"
        ];
    }

}
