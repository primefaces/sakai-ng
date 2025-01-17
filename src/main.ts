import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/core/services/auth.interceptor';

const updatedAppConfig = {
    ...appConfig,
    providers: [
        ...(appConfig.providers || []), // Preserve existing providers from appConfig
        provideHttpClient(withInterceptors([AuthInterceptor])), // Add the interceptor
    ],
};

bootstrapApplication(AppComponent, updatedAppConfig).catch((err) =>
    console.error(err)
);
