import { Component } from '@angular/core';

@Component({
    selector: 'app-seat',
    template: `
    <div class="flex flex-column align-items-center justify-content-center h-full py-5 px-3">
        <i class="pi pi-fw pi-ticket mr-2 text-2xl"></i>
        <p class="m-0 mt-5 text-center text-lg">Seat Component Content via Child Route</p>
    </div>
  `
})
export class SeatComponent { }
