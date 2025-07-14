import { Component } from '@angular/core';
import { UtilsService } from './shared/utils.service';
//import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: false,
    //imports: [RouterModule],
    template: `<router-outlet></router-outlet>
    <p-toast></p-toast>`,
    providers: [UtilsService]
})
export class AppComponent {

}
