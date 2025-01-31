import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';

const updatedAppConfig = {
    ...appConfig,
    providers: [
        ...(appConfig.providers || []), // Preserve existing providers from appConfig
        MessageService
    ],
};

bootstrapApplication(AppComponent, updatedAppConfig).catch((err) =>
    console.error(err)
);
