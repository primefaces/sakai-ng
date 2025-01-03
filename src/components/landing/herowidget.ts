import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'hero-widget',
  imports: [ButtonModule, RippleModule],
  template: `
      <div
          id="hero"
          class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden"
          style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
      >
          <div class="mx-6 md:mx-20 mt-0 md:mt-6">
              <h1 class="text-6xl font-bold text-gray-900 leading-tight"><span class="font-light block">Eu sem integer</span>eget magna fermentum</h1>
              <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">Sed blandit libero volutpat sed cras. Fames ac turpis egestas integer. Placerat in egestas erat...</p>
              <button pButton pRipple type="button" label="Get Started" class="p-button-rounded text-xl border-0 mt-4 bg-blue-500 font-normal leading-normal px-4 text-white"></button>
          </div>
          <div class="flex justify-center md:justify-end">
              <img src="/demo/images/landing/screen-1.png" alt="Hero Image" class="w-9/12 md:w-auto" />
          </div>
      </div>
  `,
})
export class HeroWidget {

}
