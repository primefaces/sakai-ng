import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '@/src/service/layout.service';

@Component({
  selector: 'topbar-widget',
  imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule],
  template: `
      <div id="home" class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
          <a class="flex align-items-center" href="#">
              <img src="assets/layout/images/{{layoutService.isDarkTheme() ? 'logo-dark' : 'logo-white'}}.svg" alt="Sakai Logo" height="50" class="mr-0 lg:mr-2"><span class="text-900 font-medium text-2xl line-height-3 mr-8">SAKAI</span>
          </a>
          <a pRipple class="cursor-pointer block lg:hidden text-700" pStyleClass="@next" enterClass="hidden" leaveToClass="hidden" [hideOnOutsideClick]="true">
              <i class="pi pi-bars text-4xl"></i>
          </a>
          <div class="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top:120px">
              <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                  <li>
                      <a (click)="router.navigate(['/landing'], {fragment: 'home'})" pRipple class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                          <span>Home</span>
                      </a>
                  </li>
                  <li>
                      <a (click)="router.navigate(['/landing'], {fragment: 'features'})" pRipple class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                          <span>Features</span>
                      </a>
                  </li>
                  <li>
                      <a (click)="router.navigate(['/landing'], {fragment: 'highlights'})" pRipple class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                          <span>Highlights</span>
                      </a>
                  </li>
                  <li>
                      <a (click)="router.navigate(['/landing'], {fragment: 'pricing'})" pRipple class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                          <span>Pricing</span>
                      </a>
                  </li>
              </ul>
              <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                  <button pButton pRipple label="Login" class="p-button-text p-button-rounded border-none font-light line-height-2 text-blue-500"></button>
                  <button pButton pRipple label="Register" class="p-button-rounded border-none ml-5 font-light line-height-2 bg-blue-500 text-white"></button>
              </div>
          </div>
      </div>
  `,
  providers: [LayoutService],
})
export class TopbarWidget {

    constructor(public router: Router, public layoutService: LayoutService) { }

}
