import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
    standalone: true,
    imports: [DividerModule],
    selector: 'app-footer',
    template: `
    <div class="layout-footer">
        <div class="footer-content">
            <div class="footer-section">
                <span class="footer-brand">AJM Insurance Services</span>
                <span class="footer-tagline">Comprehensive Commercial Trucking Insurance Solutions</span>
            </div>
            
            <p-divider layout="vertical" class="footer-divider"></p-divider>
            
            <div class="footer-section footer-center">
                <span class="footer-text">© 2025 AJM Insurance. All Rights Reserved.</span>
            </div>
            
            <p-divider layout="vertical" class="footer-divider"></p-divider>
            
            <div class="footer-section footer-right">
                <a href="mailto:support@ajminsurance.com" class="footer-link">
                    <i class="pi pi-envelope"></i>
                    Support
                </a>
                <a href="tel:+1234567890" class="footer-link">
                    <i class="pi pi-phone"></i>
                    Contact
                </a>
            </div>
        </div>
    </div>`,
    styles: [`
        .layout-footer {
            background: var(--surface-card);
            border-top: 1px solid var(--surface-border);
            padding: 1.5rem 2rem;
            margin-top: auto;
        }

        .footer-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .footer-section {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .footer-center {
            text-align: center;
        }

        .footer-right {
            flex-direction: row;
            align-items: center;
            gap: 1.5rem;
        }

        .footer-brand {
            color: var(--text-color);
            font-size: 1rem;
            font-weight: 700;
        }

        .footer-tagline {
            color: var(--text-color-secondary);
            font-size: 0.75rem;
        }

        .footer-text {
            color: var(--text-color-secondary);
            font-size: 0.875rem;
        }

        .footer-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--primary-color);
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 600;
            transition: opacity 0.2s;
        }

        .footer-link:hover {
            opacity: 0.7;
        }

        .footer-divider {
            margin: 0;
        }

        @media (max-width: 991px) {
            .footer-content {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }

            .footer-divider {
                display: none;
            }

            .footer-section {
                width: 100%;
            }

            .footer-right {
                flex-wrap: wrap;
            }
        }
    `]
})
export class AppFooter { }
