import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
    standalone: true,
    imports: [RouterLink],
})
export class NotfoundComponent { }