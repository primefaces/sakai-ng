import {Injectable, Type} from '@angular/core';
import {ItemService} from "../../../../../../assets/models/interfaces/ItemServiceInterface";
import {Course} from "../../../../../../assets/models/course";
import {CourseDialog} from "../../../dialogs/course-dialog/course-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class CourseService implements ItemService<Course> {

    constructor() {
    }

    getItemDialog(): any {
        return CourseDialog;
    }

    getTableHeader(): any[] {
        return Course.getTableColumns();
    }

    getAllItems(): Course[] {
        throw new Error('Method not implemented.');
    }
    createSingeItem(): Course {
        throw new Error('Method not implemented.');
    }
    updateSingeItem(): Course {
        throw new Error('Method not implemented.');
    }
    deleteSingleItem(): void {
        throw new Error('Method not implemented.');
    }
    deleteMultipleItem(): void {
        throw new Error('Method not implemented.');
    }
}
