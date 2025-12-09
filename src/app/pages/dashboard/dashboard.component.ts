import { Component, inject, OnInit, computed, effect } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../core/services/auth.service';
import { QuoteService } from '../../core/services/quote.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ChartModule, TableModule, TagModule, DataViewModule, AvatarModule, MenuModule],
  templateUrl: './dashboard.component.html',
  styles: [`
    :host {
        display: block;
        padding-bottom: 2rem;
    }
    .card-hover {
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .card-hover:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
  `]
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private quoteService = inject(QuoteService);
  private themeService = inject(ThemeService);

  currentUser = this.authService.currentUser;
  quoteSummary = this.quoteService.quoteSummary;
  recentQuotes = computed(() => this.quoteService.quotes().slice(0, 10)); // Top 10 recent quotes

  barChartData: any;
  barChartOptions: any;
  doughnutChartData: any;
  doughnutChartOptions: any;

  constructor() {
    effect(() => {
      if (this.themeService.isDarkMode()) {
        setTimeout(() => {
          this.initializeCharts();
        }, 0);
      } else {
        setTimeout(() => {
          this.initializeCharts();
        }, 0);
      }
    });
  }

  ngOnInit() {
    this.initializeCharts();
  }

  initializeCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const primaryColor = documentStyle.getPropertyValue('--primary-color') || '#d97706';
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Bar Chart
    this.barChartData = {
      labels: ['Draft', 'Submitted', 'Quoted', 'Bound'],
      datasets: [{
        label: 'Quotes',
        data: [
          this.quoteSummary().total - (this.quoteSummary().submitted + this.quoteSummary().quoted + this.quoteSummary().bound),
          this.quoteSummary().submitted,
          this.quoteSummary().quoted,
          this.quoteSummary().bound
        ],
        backgroundColor: [
          'rgba(107, 114, 128, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(245, 158, 11, 0.5)',
          'rgba(16, 185, 129, 0.5)'
        ],
        borderColor: [
          'rgb(107, 114, 128)',
          'rgb(59, 130, 246)',
          'rgb(245, 158, 11)',
          'rgb(16, 185, 129)'
        ],
        borderWidth: 2
      }]
    };

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    // Doughnut Chart - Commodity Distribution
    this.doughnutChartData = {
      labels: ['General Freight', 'Refrigerated', 'Flatbed', 'Auto Hauler', 'Other'],
      datasets: [{
        data: [40, 25, 15, 10, 10],
        backgroundColor: [
          primaryColor,
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(107, 114, 128, 0.8)'
        ],
        borderWidth: 0
      }]
    };

    this.doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            color: textColor,
            font: { size: 12 }
          }
        }
      }
    };
  }

  formatDate(timestamp: any): string {
    if (!timestamp) return '-';
    // Handle Firestore Timestamp
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString();
    }
    // Handle regular Date or string
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
