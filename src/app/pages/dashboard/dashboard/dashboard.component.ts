import { Component } from '@angular/core';
import { NotificationsWidget } from '../components/notificationswidget';
import { RecentSalesWidget } from '../components/recentsaleswidget';
import { RevenueStreamWidget } from '../components/revenuestreamwidget';
import { StatsWidget } from '../components/statswidget';
import { BestsellingWidgetComponent } from '../components/bestselling-widget/bestselling-widget.component';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RecentSalesWidget, BestsellingWidgetComponent, RevenueStreamWidget, NotificationsWidget],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
