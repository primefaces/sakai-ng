import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[digitOnly]'
})
export class DigitOnlyDirective {
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
        const key = event.key;
        if (!/\d/.test(key) && !allowedKeys.includes(key)) {
            event.preventDefault();
        }
    }
}
