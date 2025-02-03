import {Component, OnDestroy, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CollisionType, getCollisionTypes} from "../../../../../../assets/models/enums/collision-type";
import {TableModule} from "primeng/table";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-user-dialog',
  standalone: true,
    imports: [
        TableModule,
        DropdownModule,
        NgForOf,
        FormsModule,
        KeyValuePipe,
        NgIf

    ],
  templateUrl: './course-info.component.html'
})
export class CollisionInfoDialog implements OnInit, OnDestroy{
    protected collisions: Record<string, CollisionType[]>;
    cols: any[] = [];

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef
    ) {
        this.initData();
    }

    private initData():void {
        this.collisions = this.config.data['collisions'];
        console.log(this.collisions)
    }

    closeDialog(){
        if (this.ref) this.ref.close();
    }

    ngOnInit(): void {
        this.cols = [
            {field: 'value', header: 'Type'},
            {field: 'key', header: 'Course'}
        ];
    }

    ngOnDestroy(): void {
        this.closeDialog();
    }

    protected readonly getCollisionTypes = getCollisionTypes;
}
