import { Component } from '@angular/core';
import {ChipModule} from "primeng/chip";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {ToggleButtonModule} from "primeng/togglebutton";
import {Room} from "../../../../../assets/models/room";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-room-dialog',
  standalone: true,
    imports: [
        ChipModule,
        ButtonModule,
        RippleModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        NgIf,
        ToggleButtonModule
    ],
  templateUrl: './room-dialog.component.html',
})
export class RoomDialog {
    protected room: Room;
    protected inEditMode: boolean = false;

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef
    ) {
        this.room = this.data;
    }

    get data(): Room {
        const noData = this.config.data.initialValue;
        console.log(noData);
        this.inEditMode = Object.keys(noData).length !== 0;
        return noData ? noData : new Room();
    }

    save() {
        this.ref.close(this.room);
    }
}
