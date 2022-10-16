import { Component } from '@angular/core';

@Component({
	template: `
		<div class="flex flex-column align-items-center justify-content-center h-full py-5 px-3">
			<i class="pi pi-fw pi-user mr-2 text-2xl"></i>
			<p class="mt-5 text-center text-lg">Personal Component Content via Child Route</p>
		</div>
  	`
})
export class PersonalComponent {

	constructor() { }
}
