import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
})
export class WizardComponent {
    private _dirtyData: boolean = false;

    constructor() {
    }

    protected setDirtyDataBit(bit: boolean){
        this._dirtyData = bit;
    }

    canDeactivate(){
        return this._dirtyData;
    }

}
