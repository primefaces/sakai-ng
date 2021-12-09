import {Component, OnInit} from '@angular/core';
import {PrimeIcons} from 'primeng/api';

@Component({
    templateUrl: './app.timelinedemo.component.html',
    styleUrls: ['./app.timelinedemo.scss']
})
export class AppTimelineDemoComponent implements OnInit{

    customEvents: any[];

    horizontalEvents: any[];

    ngOnInit() {
        this.customEvents = [
            {
                status: 'Ordered',
                date: '15/10/2020 10:30',
                icon: PrimeIcons.SHOPPING_CART,
                color: '#9C27B0',
                image: 'game-controller.jpg'
            },
            {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
            {status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
            {status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
        ];

        this.horizontalEvents = [
            '2020', '2021', '2022', '2023'
        ];
    }
}
