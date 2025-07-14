import { provideHttpClient, withFetch } from '@angular/common/http';
//import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
//import { appRoutes } from './app.routes';
import { NgModule } from '@angular/core';


//export const appConfig: ApplicationConfig = {
//    providers: [
//       // provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
//        provideHttpClient(withFetch()),
//        provideAnimationsAsync(),
//        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })
//    ]
//};


@NgModule({
    providers: [
      provideHttpClient(withFetch()),
      provideAnimationsAsync(),
      providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
      // Puedes descomentar la siguiente línea si necesitas las rutas en la configuración
      // provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation())
    ]
})

export class AppConfigModule { }
