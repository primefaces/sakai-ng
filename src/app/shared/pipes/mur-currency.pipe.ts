import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mur'
})
export class MurCurrencyPipe implements PipeTransform {
    transform(value: number | string): string {
        if (typeof value === 'number') {
            return `Rs ${value.toFixed(2)}`;
        }

        if (typeof value === 'string') {
            // Remove any existing "Rs" and trim whitespace
            const numericValue = value.replace(/Rs\s?/i, '').trim();

            // Parse the numeric value
            const parsedValue = parseFloat(numericValue);

            if (!isNaN(parsedValue)) {
                return `Rs ${parsedValue.toFixed(2)}`;
            }
        }

        // Return original value if it can't be formatted
        return value as string;
    }
}
