import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-blank-section-page',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="section-shell">
            <div class="section-card">
                <div class="section-kicker">{{ title }}</div>
                <h1 class="section-title">{{ title }}</h1>
                <p class="section-copy">{{ subtitle }}</p>
            </div>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
            }

            .section-shell {
                min-height: calc(100vh - 8rem);
                display: grid;
                place-items: center;
            }

            .section-card {
                width: min(720px, 100%);
                padding: 2rem;
                border-radius: 1.75rem;
                border: 1px solid #e5e7eb;
                background: #ffffff;
                box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
            }

            .section-kicker {
                display: inline-flex;
                margin-bottom: 0.9rem;
                padding: 0.35rem 0.8rem;
                border-radius: 9999px;
                background: #f3f4f6;
                border: 1px solid #e5e7eb;
                color: #111827;
                font-size: 0.8rem;
                font-weight: 700;
                letter-spacing: 0.16em;
                text-transform: uppercase;
            }

            .section-title {
                margin: 0;
                font-size: clamp(2rem, 4vw, 3rem);
                line-height: 1.1;
                color: #111827;
            }

            .section-copy {
                margin: 1rem 0 0;
                max-width: 56ch;
                color: #4b5563;
                line-height: 1.8;
            }
        `
    ]
})
export class BlankSectionPage {
    title = 'Section';
    subtitle = 'This page is intentionally blank for now.';

    constructor(route: ActivatedRoute) {
        const data = route.snapshot.data;
        this.title = data['title'] ?? this.title;
        this.subtitle = data['subtitle'] ?? this.subtitle;
    }
}
