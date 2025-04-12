import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        provideFirebaseApp(() => initializeApp({
            apiKey: "AIzaSyCp1ieMWDtGU2PhOBApy3p5O6gxgBTzcIo",
            authDomain: "celebration-ledger.firebaseapp.com",
            projectId: "celebration-ledger",
            storageBucket: "celebration-ledger.firebasestorage.app",
            messagingSenderId: "487837077137",
            appId: "1:487837077137:web:8cd470e6bd0a3832da7930"
         })),
        provideFirestore(() => getFirestore()),
    ]
};
