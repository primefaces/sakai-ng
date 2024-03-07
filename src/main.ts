import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Correctly import Amplify and the configuration
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports'; // Adjust the path as necessary

// Configure Amplify with your AWS exports
Amplify.configure(awsExports);

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
