import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    standalone:true,
    imports: [
        ButtonModule,
        MenuModule,
    ],
    template: `<div class="card">
        <div class="flex align-items-center justify-content-between mb-4">
            <h5>Notifications</h5>
            <div>
                <button pButton type="button" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-button-plain" (click)="menu.toggle($event)"></button>
                <p-menu #menu [popup]="true" [model]="items"></p-menu>
            </div>
        </div>

        <span class="block text-600 font-medium mb-3">TODAY</span>
        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
            <li class="flex align-items-center py-2 border-bottom-1 surface-border">
                <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                    <i class="pi pi-dollar text-xl text-blue-500"></i>
                </div>
                <span class="text-900 line-height-3">Richard Jones
                    <span class="text-700"> has purchased a blue t-shirt for <span class="text-blue-500">79$</span></span>
                </span>
            </li>
            <li class="flex align-items-center py-2">
                <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                    <i class="pi pi-download text-xl text-orange-500"></i>
                </div>
                <span class="text-700 line-height-3">Your request for withdrawal of <span class="text-blue-500 font-medium">2500$</span> has been initiated.</span>
            </li>
        </ul>

        <span class="block text-600 font-medium mb-3">YESTERDAY</span>
        <ul class="p-0 m-0 list-none">
            <li class="flex align-items-center py-2 border-bottom-1 surface-border">
                <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                    <i class="pi pi-dollar text-xl text-blue-500"></i>
                </div>
                <span class="text-900 line-height-3">Keyser Wick
                    <span class="text-700"> has purchased a black jacket for <span class="text-blue-500">59$</span></span>
                </span>
            </li>
            <li class="flex align-items-center py-2 border-bottom-1 surface-border">
                <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                    <i class="pi pi-question text-xl text-pink-500"></i>
                </div>
                <span class="text-900 line-height-3">Jane Davis<span class="text-700"> has posted a new questions about your product.</span></span>
            </li>
        </ul>
    </div>`,
})
export class NotificationsWidget {

}
