import { Component } from '@angular/core';
import { StatsWidget } from '@/src/components/dashboard/statswidget';
import { RecentSalesWidget } from '@/src/components/dashboard/recentsaleswidget';
import { BestSellingWidget } from '@/src/components/dashboard/bestsellingwidget';
import { RevenueStreamWidget } from '@/src/components/dashboard/revenuestreamwidget';
import { NotificationsWidget } from '@/src/components/dashboard/notificationswidget';

@Component({
  selector: 'app-dashboard',
  imports: [StatsWidget, RecentSalesWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget],
  template: `
      <div class="grid grid-cols-12 gap-8">
          <app-stats-widget />

          <div class="col-span-12 xl:col-span-6">
              <app-recent-sales-widget />
              <app-best-selling-widget />
          </div>
          <div class="col-span-12 xl:col-span-6">
              <app-revenue-stream-widget />
              <app-notifications-widget />
          </div>
      </div>
  `,
})
export class Dashboard {}
