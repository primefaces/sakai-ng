import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RippleModule} from 'primeng/ripple';
import {StyleClassModule} from 'primeng/styleclass';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import { HeroWidget } from '@/src/components/landing/herowidget';
import { FeaturesWidget } from '@/src/components/landing/featureswidget';
import { HighlightsWidget } from '@/src/components/landing/highlightswidget';
import { PricingWidget } from '@/src/components/landing/pricingwidget';
import { FooterWidget } from '@/src/components/landing/footerwidget';
import { TopbarWidget } from '@/src/components/landing/topbarwidget.component';

@Component({
  standalone: true,
  imports: [RouterModule,TopbarWidget, HeroWidget, FeaturesWidget, HighlightsWidget, PricingWidget, FooterWidget, RippleModule, StyleClassModule, ButtonModule, DividerModule],
  template:`<div class="bg-surface-0 dark:bg-surface-900">
      <div id="home" class="landing-wrapper overflow-hidden">
          <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
              <topbar-widget />
          </div>
          <hero-widget />
          <features-widget />
          <highlights-widget />
          <pricing-widget />
          <footer-widget />
      </div>
  </div>`,
})
export class Landing {}
