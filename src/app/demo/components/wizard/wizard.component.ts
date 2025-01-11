import { Component } from '@angular/core';
import {TmpTimeTable} from "../../../../assets/models/tmp-time-table";

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
})
export class WizardComponent {
    currentTable: TmpTimeTable;
    private _dirtyData: boolean = false;

    constructor() {
        this.currentTable = JSON.parse(localStorage.getItem('wizard-table'));
    }

    protected setDirtyDataBit(bit: boolean){
        this._dirtyData = bit;
    }

    canDeactivate(){
        return this._dirtyData;
    }

    getColorBasedOnIndex(type: string, index: number): string {
        if (index > this.currentTable.currentPageIndex) {
            return '#CDCDCC';
        }

        if (type === 'i') {
            switch (index) {
                case 0:
                    return '#9EC252';
                case 1:
                    return '#75CF84';
                case 2:
                    return '#75CFCA';
                case 3:
                    return '#75A9CF';
                default:
                    return '#CDCDCC';
            }
        } else {
            return '#070707';
        }
    }
}
