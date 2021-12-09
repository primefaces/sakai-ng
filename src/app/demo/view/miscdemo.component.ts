import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './miscdemo.component.html',
    styles: [`
		:host ::ng-deep .misc-demo .p-button.p-widget {
		    min-width: 6rem;
	    }

		:host ::ng-deep .misc-demo .badges .p-badge {
		    margin-right: .5rem;
		}

		:host ::ng-deep .misc-demo .badges .p-tag {
			margin-right: .5rem;
		}

        :host ::ng-deep .p-chip.custom-chip {
            background: var(--primary-color);
            color: var(--primary-color-text);
        }

        :host ::ng-deep .custom-scrolltop{
            width: 2rem;
            height: 2rem;
            border-radius: 4px;
            background-color: var(--primary-color);
        }

        :host ::ng-deep .custom-scrolltop .p-scrolltop-icon {
            font-size: 1rem;
            color: var(--primary-color-text);
        }

        :host ::ng-deep .custom-scrolltop:hover {
             background-color: var(--primary-color);
        }

        :host ::ng-deep  .custom-skeleton {
            border: 1px solid var(--surface-d);
            border-borderRadius: 4px;
        }

        :host ::ng-deep  .custom-skeleton ul {
            list-style: none;
        }
    `]
})
export class MiscDemoComponent implements OnInit {

    value = 0;

    ngOnInit() {
        const interval = setInterval(() => {
            this.value = this.value + Math.floor(Math.random() * 10) + 1;
            if (this.value >= 100) {
                this.value = 100;
                clearInterval(interval);
            }
        }, 2000);
    }
}
