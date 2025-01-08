import { Component } from '@angular/core';
import {ChipModule} from "primeng/chip";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {PasswordModule} from "primeng/password";

@Component({
  selector: 'app-user-dialog',
  standalone: true,
    imports: [
        ChipModule,
        ButtonModule,
        RippleModule,
        DropdownModule,
        InputTextModule,
        FormsModule,
        MultiSelectModule,
        PasswordModule
    ],
  templateUrl: './user-dialog.component.html'
})
export class InfoDialog {}
