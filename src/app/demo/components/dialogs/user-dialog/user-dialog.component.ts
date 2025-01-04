import { Component } from '@angular/core';
import {ChipModule} from "primeng/chip";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Userx} from "../../../../../assets/models/userx";
import {getRoleOptions} from "../../../../../assets/models/enums/role";
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
export class UserDialog {
    protected user: Userx;
    protected inEditMode: boolean = false;
    roleOptions = getRoleOptions();

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef
    ) {
        this.user = this.data;
    }

    get data(): Userx {
        const noData =  this.config.data.initialValue;
        this.inEditMode = Object.keys(noData).length !== 0;
        return noData ? noData : new Userx();
    }

    save() {
        this.user.enabled = true;
        this.user.new = true;
        this.ref.close(this.user);
    }

}
