import { Component } from '@angular/core';
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {TmpTimeTable} from "../../../../../assets/models/tmp-time-table";

interface Options{
    preselect: boolean | null;
    semesterCourses: boolean | null;
    degree: [string|null, string|null, string|null];
    roomImport: boolean  | null;
}

@Component({
  selector: 'app-pre-wizard',
    templateUrl: './pre-wizard.component.html',
})
export class PreWizardComponent {
    currentTable: TmpTimeTable;
    options: Options;

    constructor(
        private layoutService: LayoutService,
    ) {
        this.options = {degree: [null, null, null]} as Options;
        this.layoutService.changeStyle(false);
        this.currentTable = JSON.parse(localStorage.getItem('wizard-table'));
    }


    setOption(optionName: string, value: boolean, event:Event): void {
        const button = event.target as HTMLElement;
        button.style.backgroundColor = value ? 'var(--sys-color-primary-green)' : 'var(--sys-color-primary-red)';
        this.options[optionName] = value;
    }

    changeDegree(idx: number, value: string, event: Event):void{
        const currentValue = this.options.degree[idx];
        this.options.degree[idx] = currentValue ? null : value

        const button = event.target as HTMLElement;
        button.style.backgroundColor = currentValue ? 'var(--sys-color-primary-blue)' : 'var(--sys-color-primary-orange)';
    }
}
