import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // AWS Amplify UI components require BrowserModule
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';

// AWS Amplify specific imports
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports'; // Ensure this path matches the location of your aws-exports file
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular'; // This is for using Amplify's Authenticator

Amplify.configure(awsExports); // Configure Amplify with your aws-exports file

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        // Any other components you have
    ],
    imports: [
        BrowserModule, // Added to support Amplify UI components
        AppRoutingModule,
        AppLayoutModule,
        AmplifyAuthenticatorModule, // Add this to use Amplify's Authenticator component
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        ProductService,
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        // Any other services you have
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
