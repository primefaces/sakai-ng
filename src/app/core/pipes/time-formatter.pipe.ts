import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormatter',
    standalone: true, // Still works as a standalone pipe
})
@Injectable({
    providedIn: 'root', // Allows it to be injected programmatically
})
export class TimeFormatterPipe implements PipeTransform {
    transform(value: number | string, format: 'toSeconds' | 'toTime'): string | undefined {
        if (!value) return undefined;

        if (format === 'toTime') {
            const totalSeconds = +value; // Ensure the value is treated as a number
            const minutes = Math.floor(totalSeconds / 60); // Get the number of minutes
            const seconds = totalSeconds % 60; // Get the remaining seconds
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // Format as MM:SS
        }

        if (format === 'toSeconds') {
            const [minutes, seconds] = (value as string).split(':').map(Number); // Split the MM:SS string
            return (minutes * 60 + seconds).toString(); // Convert to total seconds
        }

        return undefined;
    }
}
