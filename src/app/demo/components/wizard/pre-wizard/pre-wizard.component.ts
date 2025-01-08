import { Component } from '@angular/core';
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {TmpTimeTable} from "../../../../../assets/models/tmp-time-table";

@Component({
  selector: 'app-pre-wizard',
    templateUrl: './pre-wizard.component.html',
})
export class PreWizardComponent {
    currentTable: TmpTimeTable;
    constructor(
        private layoutService: LayoutService,
    ) {
        this.layoutService.changeStyle(false);
        this.currentTable = JSON.parse(localStorage.getItem('wizard-table'));
    }
}
