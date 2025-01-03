import {Injectable} from '@angular/core';
import {ItemService} from "../../../../../../assets/models/interfaces/ItemServiceInterface";
import {Course} from "../../../../../../assets/models/course";
import {CourseDialog} from "../../../dialogs/course-dialog/course-dialog.component";
import {CourseType} from "../../../../../../assets/models/enums/course-type";
import {StudyType} from "../../../../../../assets/models/enums/study-type";
import {Observable, of} from "rxjs";

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

    createSingeItem(item: Course): Course {
        return undefined;
    }

    updateSingeItem(item: Course): Course {
        return undefined;
    }

    deleteSingleItem(item: Course): boolean {
        return true;
    }

    deleteMultipleItem(items: Course[]): boolean {
        return true;
    }

    getAllItems(): Observable<Course[]> {
        return of([
            {id: 'tmp', semester: 1, courseType: CourseType.PS, name: 'tmpEli', lecturer: 'Eli',
            duration: 200, numberOfParticipants: 15, createdAt: new Date(), updatedAt: new Date(),
                studyType: StudyType.BACHELOR_CS.toString(), computersNecessary: false} as Course
        ]);
    }
}
