import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    isDarkMode = signal<boolean>(false);

    constructor() {
        // Initialize based on existing class or system preference could go here
        // For now, we trust the class on documentElement if it exists
        const element = document.documentElement;
        if (element.classList.contains('my-app-dark')) {
            this.isDarkMode.set(true);
        }
    }

    toggleDarkMode() {
        this.isDarkMode.update(v => !v);
        const element = document.documentElement;
        if (this.isDarkMode()) {
            element.classList.add('my-app-dark');
        } else {
            element.classList.remove('my-app-dark');
        }
    }

    // Force set (e.g. if we read from local storage)
    setDarkMode(isDark: boolean) {
        this.isDarkMode.set(isDark);
        const element = document.documentElement;
        if (isDark) {
            element.classList.add('my-app-dark');
        } else {
            element.classList.remove('my-app-dark');
        }
    }
}
