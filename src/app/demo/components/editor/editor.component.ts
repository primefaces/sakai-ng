import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
  templateUrl: './editor.component.html',
})
export class EditorComponent  implements OnInit, OnDestroy{

    constructor(
        private layoutService: LayoutService
    ) {}

    ngOnInit(): void {
        this.layoutService.handleMenuBar(true);
    }

    ngOnDestroy(): void {
        this.layoutService.handleMenuBar(false);
    }
}
