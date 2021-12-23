import { Component } from '@angular/core';

@Component({
  selector: 'app-paymentdemo',
  template: `
    <div class="flex align-items-center py-5 px-3">
      <i class="pi pi-fw pi-money-bill mr-2 text-2xl"></i>
      <p class="m-0 text-lg">Payment Component Content via Child Route</p>
    </div>
  `
})
export class PaymentDemoComponent{

  constructor() { }
}
