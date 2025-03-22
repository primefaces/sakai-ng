import { Component } from '@angular/core';
import { RecentSalesWidgetComponent } from '../components/recent-sales-widget/recent-sales-widget.component';
import { BestsellingWidgetComponent } from '../components/bestselling-widget/bestselling-widget.component';
import { NotificationsWidgetComponent } from '../components/notifications-widget/notifications-widget.component';
import { RevenueStreamWidgetComponent } from '../components/revenue-stream-widget/revenue-stream-widget.component';
import { StatsWidgetComponent } from '../components/stats-widget/stats-widget.component';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidgetComponent, RecentSalesWidgetComponent, BestsellingWidgetComponent, RevenueStreamWidgetComponent, NotificationsWidgetComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
