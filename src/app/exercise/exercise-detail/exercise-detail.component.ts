import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Exercise } from '../../core/models/exercises/Exercise';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Fluid } from 'primeng/fluid';
import { UIChart } from 'primeng/chart';
import 'chartjs-adapter-date-fns';

@Component({
    selector: 'app-exercise-detail',
    imports: [Dialog, Button, Fluid, UIChart],
    templateUrl: './exercise-detail.component.html',
    styleUrl: './exercise-detail.component.scss'
})
export class ExerciseDetailComponent implements OnChanges {
    @Input() visible = false;
    @Input() exercise:
        | undefined
        | (Exercise & {
              progress?: { metric: number | null; date: string }[];
              bestPerformance?: { metric: number | null; date: string | null };
          });
    @Output() closeDialog = new EventEmitter<void>(); // Notify parent to close dialog

    lineOptions: any;
    chartData: any;

    constructor() {
        this.initChartOptions();
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngOnChanges triggered', changes);

        if (changes['visible'] && this.visible && this.exercise?.progress) {
            this.initChartOptions(); // Ensure options are initialized
            this.prepareChartData();
        }

        if (changes['exercise'] && this.exercise?.progress) {
            this.initChartOptions(); // Ensure options are initialized
            this.prepareChartData();
        }
    }

    hideDialog() {
        this.closeDialog.emit(); // Notify parent to close dialog
    }

    initChartOptions(): void {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.lineOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    type: 'category',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'dd.MM.yy',
                        displayFormats: {
                            day: 'dd.MM.yy'
                        }
                    },
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
    }

    prepareChartData(): void {
        if (!this.exercise?.progress) {
            return;
        }

        this.initChartOptions();

        // Convert progress data into a sortable array with date objects
        const sortedProgress = this.exercise.progress
            .map((item) => ({
                date: new Date(item.date), // Convert to Date object
                formattedDate: new Date(item.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' }),
                metric: item.metric
            }))
            .sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort by date ascending

        // Extract sorted labels and data
        const labels = sortedProgress.map((item) => item.formattedDate);
        const data = sortedProgress.map((item) => item.metric);

        // Calculate dynamic Y-axis max value
        this.calculateDynamicYAxisHeight(data);

        this.chartData = {
            labels,
            datasets: [
                {
                    label: `Fortschritt`,
                    data,
                    fill: false,
                    borderColor: '#42A5F5',
                    backgroundColor: '#42A5F5',
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        };
    }

    private calculateDynamicYAxisHeight(data: (number | null)[] ): void {
        const validData = data.filter((value): value is number => value !== null);
        const maxValue = validData.length > 0 ? Math.max(...validData) : 0;
        const buffer = 40; // Adjust this value as needed
        this.lineOptions.scales.y.suggestedMax = maxValue + buffer;
    }

}
