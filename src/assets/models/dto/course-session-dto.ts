import { Timing } from './timing';
import {RoomTable} from "../room-table";

export class CourseSession {
    id: number;
    name: string;
    assigned: boolean;
    fixed: boolean;
    duration: number;
    courseId: number;
    semester: number;
    studyType: string;
    numberOfParticipants: number;
    computersNecessary?: boolean;
    timingConstraints: Timing[];
    timing: Timing | null;
    roomTable: RoomTable | null;
}
