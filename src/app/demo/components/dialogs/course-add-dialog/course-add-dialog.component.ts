import { Component } from '@angular/core';
import {Course} from "../../../../../assets/models/course";
import {CommonModule} from "@angular/common";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {EditorRequestService} from "../../editor/api/editor-request.service";
import {TableModule} from "primeng/table";
import {ButtonDirective} from "primeng/button";
import {CourseSession} from "../../../../../assets/models/dto/course-session-dto";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-course-add-dialog',
  standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonDirective
    ],
  templateUrl: './course-add-dialog.component.html',
})

export class CourseAddDialog {
    protected newCourses: Course[] = [];
    protected newAddedCourses: CourseSession[] = [];
    private currentTableId: number;

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
        private editorRequest: EditorRequestService,
        private messageService: MessageService
    ) {
        this.initData().then();
    }

    private async initData() {
        this.currentTableId =  this.config.data['tableID'];
        this.newCourses = await this.editorRequest.getUnassignedCourses(this.currentTableId);
    }

    async receiveNewSession(course: Course){
        const newSession:CourseSession = await this.editorRequest.getNewSession(this.currentTableId, course);
        const idx = this.newCourses.findIndex(s => s.id == course.id);

        if (idx > -1) {
            this.newCourses.splice(idx, 1);
            this.newAddedCourses.push(newSession);
            this.messageService.add({severity: 'info', summary: 'Added new course:', detail: `${newSession[0].name}`});
        }
    }

    save() {
        this.ref.close(this.newAddedCourses);
    }
}
