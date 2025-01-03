import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone:true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `<div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-500 font-medium mb-3">Orders</span>
                    <div class="text-900 font-medium text-xl">152</div>
                </div>
                <div class="flex align-items-center justify-content-center bg-blue-100 border-round" [ngStyle]="{width: '2.5rem', height: '2.5rem'}">
                    <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                </div>
            </div>
            <span class="text-green-500 font-medium">24 new </span>
            <span class="text-500">since last visit</span>
        </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-500 font-medium mb-3">Revenue</span>
                    <div class="text-900 font-medium text-xl">$2.100</div>
                </div>
                <div class="flex align-items-center justify-content-center bg-orange-100 border-round" [ngStyle]="{width: '2.5rem', height: '2.5rem'}">
                    <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                </div>
            </div>
            <span class="text-green-500 font-medium">%52+ </span>
            <span class="text-500">since last week</span>
        </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-500 font-medium mb-3">Customers</span>
                    <div class="text-900 font-medium text-xl">28441</div>
                </div>
                <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" [ngStyle]="{width: '2.5rem', height: '2.5rem'}">
                    <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                </div>
            </div>
            <span class="text-green-500 font-medium">520  </span>
            <span class="text-500">newly registered</span>
        </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-500 font-medium mb-3">Comments</span>
                    <div class="text-900 font-medium text-xl">152 Unread</div>
                </div>
                <div class="flex align-items-center justify-content-center bg-purple-100 border-round" [ngStyle]="{width: '2.5rem', height: '2.5rem'}">
                    <i class="pi pi-comment text-purple-500 text-xl"></i>
                </div>
            </div>
            <span class="text-green-500 font-medium">85 </span>
            <span class="text-500">responded</span>
        </div>
    </div>`,
})
export class StatsWidget {}
