import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'pricing-widget',
  imports: [DividerModule, ButtonModule, RippleModule],
  template: `
      <div id="pricing" class="py-4 px-4 lg:px-8 my-2 md:my-4">
          <div class="text-center">
              <h2 class="text-900 font-normal mb-2">Matchless Pricing</h2>
              <span class="text-600 text-2xl">Amet consectetur adipiscing elit...</span>
          </div>

          <div class="grid justify-content-between mt-8 md:mt-0">
              <div class="col-12 lg:col-4 p-0 md:p-3">
                  <div class="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all" style="border-radius:10px">
                      <h3 class="text-900 text-center my-5">Free</h3>
                      <img src="assets/demo/images/landing/free.svg" class="w-10 h-10 mx-auto" alt="free">
                      <div class="my-5 text-center">
                          <span class="text-5xl font-bold mr-2 text-900">$0</span>
                          <span class="text-600">per month</span>
                          <button pButton pRipple label="Get Started" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></button>
                      </div>
                      <p-divider class="w-full bg-surface-200"></p-divider>
                      <ul class="my-5 list-none p-0 flex text-900 flex-column">
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">Responsive Layout</span>
                          </li>
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">Unlimited Push Messages</span>
                          </li>
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">50 Support Ticket</span>
                          </li>
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">Free Shipping</span>
                          </li>
                      </ul>
                  </div>
              </div>

              <div class="col-12 lg:col-4 p-0 md:p-3 mt-4 md:mt-0">
                  <div class="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all" style="border-radius:10px">
                      <h3 class="text-900 text-center my-5">Startup</h3>
                      <img src="assets/demo/images/landing/startup.svg" class="w-10 h-10 mx-auto" alt="startup">
                      <div class="my-5 text-center">
                          <span class="text-5xl font-bold mr-2 text-900">$1</span>
                          <span class="text-600">per month</span>
                          <button pButton pRipple label="Try Free" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></button>
                      </div>
                      <p-divider class="w-full bg-surface-200"></p-divider>
                      <ul class="my-5 list-none p-0 flex text-900 flex-column">
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">Responsive Layout</span>
                          </li>
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">Unlimited Push Messages</span>
                          </li>
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">50 Support Ticket</span>
                          </li>
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">Free Shipping</span>
                          </li>
                      </ul>
                  </div>
              </div>

              <div class="col-12 lg:col-4 p-0 md:p-3 mt-4 md:mt-0">
                  <div class="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all" style="border-radius:10px">
                      <h3 class="text-900 text-center my-5">Enterprise</h3>
                      <img src="assets/demo/images/landing/enterprise.svg" class="w-10 h-10 mx-auto" alt="enterprise">
                      <div class="my-5 text-center">
                          <span class="text-5xl font-bold mr-2 text-900">$999</span>
                          <span class="text-600">per month</span>
                          <button pButton pRipple label="Get a Quote" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></button>
                      </div>
                      <p-divider class="w-full bg-surface-200"></p-divider>
                      <ul class="my-5 list-none p-0 flex text-900 flex-column">
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">Responsive Layout</span>
                          </li>
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">Unlimited Push Messages</span>
                          </li>
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">50 Support Ticket</span>
                          </li>
                          <li class="py-2">
                              <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                              <span class="text-xl line-height-3">Free Shipping</span>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
  `,
})
export class PricingWidget {

}
