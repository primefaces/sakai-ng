import { Component } from '@angular/core';
import {LayoutService} from "../../../../layout/service/app.layout.service";

@Component({
  selector: 'app-pre-wizard',
    templateUrl: './pre-wizard.component.html',
})
export class PreWizardComponent {
    constructor(
        private layoutService: LayoutService,
    ) {
        this.layoutService.changeStyle(false);
    }
}
