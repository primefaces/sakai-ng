import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmationdemo',
  template: `
  <div class="flex align-items-center py-5 px-3">
    <i class="pi pi-fw pi-check mr-2 text-2xl"></i>
    <p class="m-0 text-lg">Confirmation Component Content via Child Route</p>
  </div>
  `
})
export class ConfirmationDemoComponent {

  constructor() { }
}
