import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

interface AppState {
    preset?: string;
    primary?: string;
    surface?: string;
    darkTheme?: boolean;
    menuActive?: boolean;
    designerKey?: string;
    RTL?: boolean;
    overlayMenuActive?: boolean;
    menuMode?: string;
    staticMenuDesktopInactive?: boolean;
    staticMenuMobileActive?: boolean;
    profileSidebarVisible?: boolean;
    configSidebarVisible?: boolean;
    menuHoverActive?: boolean;
    activeMenuItem?: boolean;
}


@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private readonly STORAGE_KEY = 'appConfigState';

    appState = signal<AppState>(null);

    document = inject(DOCUMENT);

    platformId = inject(PLATFORM_ID);

    theme = computed(() => (this.appState()?.darkTheme ? 'dark' : 'light'));

    transitionComplete = signal<boolean>(false);

    private initialized = false;

    constructor() {
        effect(() => {
            this.appState.set({ ...this.loadAppState() });
            const state = this.appState();

            if (!this.initialized || !state) {
                this.initialized = true;
                return;
            }

            this.saveAppState(state);
            this.handleDarkModeTransition(state);
        });
    }

    private handleDarkModeTransition(state: AppState): void {
        if (isPlatformBrowser(this.platformId)) {
            if ((document as any).startViewTransition) {
                this.startViewTransition(state);
            } else {
                this.toggleDarkMode(state);
                this.onTransitionEnd();
            }
        }
    }

    private startViewTransition(state: AppState): void {
        const transition = (document as any).startViewTransition(() => {
            this.toggleDarkMode(state);
        });

        transition.ready.then(() => this.onTransitionEnd());
    }

    private toggleDarkMode(state: AppState): void {
        if (state.darkTheme) {
            this.document.documentElement.classList.add('app-dark');
        } else {
            this.document.documentElement.classList.remove('app-dark');
        }
    }

    private toggleMenu ()  {
        const {menuMode, overlayMenuActive, staticMenuDesktopInactive, staticMenuMobileActive} = this.appState();

        if (menuMode === 'overlay') {
            this.appState.update((prev) => ({...prev, overlayMenuActive: !overlayMenuActive}));
        }

        if (window.innerWidth > 991) {
            this.appState.update((prev) => ({...prev, staticMenuDesktopInactive: !staticMenuDesktopInactive}));
        } else {
            this.appState.update((prev) => ({...prev, staticMenuMobileActive: !staticMenuMobileActive}));
        }
    };

    isSidebarActive = computed(() => this.appState().overlayMenuActive || this.appState().staticMenuMobileActive);

    isDarkTheme = computed(() => this.appState().darkTheme);

    getPrimary = computed(() => this.appState().primary);

    getSurface = computed(() => this.appState().surface);

    private onTransitionEnd() {
        this.transitionComplete.set(true);
        setTimeout(() => {
            this.transitionComplete.set(false);
        });
    }

    private loadAppState(): any {
        if (isPlatformBrowser(this.platformId)) {
            const storedState = localStorage.getItem(this.STORAGE_KEY);
            if (storedState) {
                return JSON.parse(storedState);
            }
        }
        return {
            preset: 'Aura',
            primary: 'noir',
            surface: null,
            darkTheme: false,
            menuActive: false,
            designerKey: 'primeng-designer-theme',
            RTL: false
        };
    }

    private saveAppState(state: any): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        }
    }
}
