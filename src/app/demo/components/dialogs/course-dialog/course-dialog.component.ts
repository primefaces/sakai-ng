import { Component } from '@angular/core';
import {ChipModule} from "primeng/chip";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {Course} from "../../../../../assets/models/course";
import {getCourseOptions} from "../../../../../assets/models/enums/course-type";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {getDegreeOptions} from "../../../../../assets/models/enums/study-type";
import {ToggleButtonModule} from "primeng/togglebutton";

@Component({
  selector: 'app-course-dialog',
  standalone: true,
    imports: [
        ChipModule, ButtonModule, RippleModule,
        DropdownModule, InputTextModule,ToggleButtonModule,
        FormsModule, NgIf
    ],
  templateUrl: './course-dialog.component.html',
})

export class CourseDialog {
    protected course: Course;
    protected inEditMode: boolean = false;
    protected courseOptions = getCourseOptions();
    protected degreeOptions = getDegreeOptions();
    protected semesterOptions = [1, 2, 3, 4, 5, 6];

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef
    ) {
        this.course = this.data;
    }

    get data(): Course {
        const noData =  this.config.data.initialValue;
        this.inEditMode = Object.keys(noData).length !== 0;
        return noData ? noData : new Course();
    }

    save() {
        this.ref.close(this.course);
    }
}
