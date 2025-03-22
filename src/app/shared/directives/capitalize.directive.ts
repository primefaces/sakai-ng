import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[capitalize]'
})
export class CapitalizeDirective {
    constructor(private el: ElementRef) {}

    @HostListener('input', ['$event'])
    onInput(): void {
        const input = this.el.nativeElement as HTMLInputElement;
        input.value = this.capitalizeFirstLetter(input.value);
    }

    private capitalizeFirstLetter(value: string): string {
        return value.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    }
}
