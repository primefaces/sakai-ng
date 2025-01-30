import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TopbarWidgetComponent } from './components/topbar-widget/topbar-widget.component';
import { HeroWidgetComponent } from './components/hero-widget/hero-widget.component';
import { FeaturesWidgetComponent } from './components/features-widget/features-widget.component';
import { HighlightsWidgetComponent } from './components/highlights-widget/highlights-widget.component';
import { PricingWidgetComponent } from './components/pricing-widget/pricing-widget.component';
import { FooterWidgetComponent } from './components/footer-widget/footer-widget.component';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, TopbarWidgetComponent, HeroWidgetComponent, FeaturesWidgetComponent, HighlightsWidgetComponent, PricingWidgetComponent, FooterWidgetComponent, RippleModule, StyleClassModule, ButtonModule, DividerModule],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900">
            <div id="home" class="landing-wrapper overflow-hidden">
                <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static" />
                <hero-widget />
                <features-widget />
                <highlights-widget />
                <pricing-widget />
                <footer-widget />
            </div>
        </div>
    `
})
export class Landing {}
