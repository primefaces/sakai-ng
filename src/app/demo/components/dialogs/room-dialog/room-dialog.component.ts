import { Component } from '@angular/core';
import {ChipModule} from "primeng/chip";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-room-dialog',
  standalone: true,
    imports: [
        ChipModule,
        ButtonModule,
        RippleModule
    ],
  templateUrl: './room-dialog.component.html',
  styleUrl: './room-dialog.component.scss'
})
export class RoomDialog {

}
