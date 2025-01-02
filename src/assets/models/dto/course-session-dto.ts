import { TimingDTO } from './timing-dto';
import {RoomTableDTO} from "./room-table-dto";

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
    timingConstraints: TimingDTO[];
    timing: TimingDTO | null;
    roomTable: RoomTableDTO | null;
}
